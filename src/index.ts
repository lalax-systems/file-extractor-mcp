#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from 'fs/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Create an MCP server
const server = new McpServer({
  name: "file-extractor",
  version: "0.1.0"
});

// Tool for extracting files from one directory to another
server.tool(
  "extract_files",
  {
    sourceDir: z.string().describe("Path to the source directory"),
    targetDir: z.string().describe("Path to the target directory"),
    pattern: z.string().optional().describe("File pattern to extract (e.g., *.jpg, *.txt)"),
    recursive: z.boolean().optional().default(true).describe("Search recursively in subdirectories"),
    move: z.boolean().optional().default(false).describe("Move files instead of copying"),
    conflictResolution: z.enum(["skip", "overwrite", "rename"]).optional().default("rename").describe("How to handle name conflicts")
  },
  async ({ sourceDir, targetDir, pattern, recursive, move, conflictResolution }) => {
    try {
      // Validate directories
      const sourceStats = await fs.stat(sourceDir).catch(() => null);
      if (!sourceStats || !sourceStats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: Source directory '${sourceDir}' does not exist or is not a valid directory`
          }],
          isError: true
        };
      }

      // Create target directory if it doesn't exist
      await fs.mkdir(targetDir, { recursive: true });

      // Function to process files
      const processFiles = async (currentDir: string, relativePath = ""): Promise<{ processed: number; conflicts: number; errors: number }> => {
        let processed = 0;
        let conflicts = 0;
        let errors = 0;

        try {
          const entries = await fs.readdir(currentDir, { withFileTypes: true });

          for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            const relativeEntryPath = path.join(relativePath, entry.name);

            if (entry.isDirectory() && recursive) {
              // Process subdirectory recursively
              const result = await processFiles(fullPath, relativeEntryPath);
              processed += result.processed;
              conflicts += result.conflicts;
              errors += result.errors;
            } else if (entry.isFile()) {
              // Check pattern if specified
              if (pattern && !entry.name.match(convertPatternToRegex(pattern))) {
                continue;
              }

              const targetPath = path.join(targetDir, relativeEntryPath);
              const targetDirPath = path.dirname(targetPath);

              // Create target directory if it doesn't exist
              await fs.mkdir(targetDirPath, { recursive: true });

              // Check if file already exists in target
              const targetExists = await fs.stat(targetPath).catch(() => false);

              if (targetExists) {
                conflicts++;
                switch (conflictResolution) {
                  case "skip":
                    continue;
                  case "overwrite":
                    // Continue to overwrite
                    break;
                  case "rename":
                    // Generate unique name
                    const { name: baseName, ext } = path.parse(entry.name);
                    let counter = 1;
                    let newTargetPath = targetPath;
                    while (await fs.stat(newTargetPath).catch(() => false)) {
                      newTargetPath = path.join(targetDirPath, `${baseName}_${counter}${ext}`);
                      counter++;
                    }
                    await copyOrMoveFile(fullPath, newTargetPath, move);
                    processed++;
                    continue;
                }
              }

              // Copy or move the file
              try {
                await copyOrMoveFile(fullPath, targetPath, move);
                processed++;
              } catch (error) {
                errors++;
                console.error(`Error processing file ${fullPath}:`, error);
              }
            }
          }
        } catch (error) {
          errors++;
          console.error(`Error reading directory ${currentDir}:`, error);
        }

        return { processed, conflicts, errors };
      };

      // Helper function to convert glob pattern to regex
      function convertPatternToRegex(pattern: string): RegExp {
        const escaped = pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.');
        return new RegExp(`^${escaped}$`);
      }

      // Function to copy or move file
      async function copyOrMoveFile(source: string, target: string, shouldMove: boolean): Promise<void> {
        if (shouldMove) {
          await fs.rename(source, target);
        } else {
          const sourceStream = createReadStream(source);
          const targetStream = createWriteStream(target);
          await pipeline(sourceStream, targetStream);
        }
      }

      // Process files
      const result = await processFiles(sourceDir);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Operation completed ${move ? 'moving' : 'copying'} files`,
            summary: {
              totalProcessed: result.processed,
              conflictsResolved: result.conflicts,
              errors: result.errors,
              operation: move ? "move" : "copy",
              sourceDirectory: sourceDir,
              targetDirectory: targetDir
            }
          }, null, 2)
        }]
      };

    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }
);

// Tool for listing files in a directory
server.tool(
  "list_files",
  {
    directory: z.string().describe("Path to the directory to list"),
    pattern: z.string().optional().describe("File pattern to list (e.g., *.jpg, *.txt)"),
    recursive: z.boolean().optional().default(false).describe("List recursively")
  },
  async ({ directory, pattern, recursive }) => {
    try {
      const stats = await fs.stat(directory).catch(() => null);
      if (!stats || !stats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: Directory '${directory}' does not exist or is not a valid directory`
          }],
          isError: true
        };
      }

      const files: Array<{
        name: string;
        path: string;
        size: number;
        isDirectory: boolean;
        modified: string;
      }> = [];

      const listFilesRecursive = async (currentDir: string, relativePath = ""): Promise<void> => {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          const relativeEntryPath = path.join(relativePath, entry.name);
          const stats = await fs.stat(fullPath);

          if (entry.isDirectory() && recursive) {
            await listFilesRecursive(fullPath, relativeEntryPath);
          }

          // Check pattern if specified
          if (pattern && !entry.name.match(convertPatternToRegex(pattern))) {
            continue;
          }

          files.push({
            name: entry.name,
            path: relativeEntryPath,
            size: stats.size,
            isDirectory: entry.isDirectory(),
            modified: stats.mtime.toISOString()
          });
        }
      };

      function convertPatternToRegex(pattern: string): RegExp {
        const escaped = pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.');
        return new RegExp(`^${escaped}$`);
      }

      await listFilesRecursive(directory);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            directory,
            totalFiles: files.length,
            files: files
          }, null, 2)
        }]
      };

    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }
);

// Tool for organizing files by type
server.tool(
  "organize_files",
  {
    sourceDir: z.string().describe("Path to the source directory"),
    targetDir: z.string().optional().describe("Path to the target directory (optional, default: same directory)"),
    organizeBy: z.enum(["extension", "date", "size"]).default("extension").describe("Organization criteria")
  },
  async ({ sourceDir, targetDir, organizeBy }) => {
    try {
      const targetDirectory = targetDir || sourceDir;
      const stats = await fs.stat(sourceDir).catch(() => null);
      if (!stats || !stats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: Directory '${sourceDir}' does not exist or is not a valid directory`
          }],
          isError: true
        };
      }

      await fs.mkdir(targetDirectory, { recursive: true });

      const entries = await fs.readdir(sourceDir, { withFileTypes: true });
      const files = entries.filter(entry => entry.isFile());
      let organized = 0;
      let errors = 0;

      for (const entry of files) {
        try {
          const sourcePath = path.join(sourceDir, entry.name);
          const stats = await fs.stat(sourcePath);

          let categoryDir = "";
          switch (organizeBy) {
            case "extension":
              const ext = path.extname(entry.name).toLowerCase() || "no_extension";
              categoryDir = ext.startsWith('.') ? ext.slice(1) : ext;
              break;
            case "date":
              const date = stats.mtime;
              categoryDir = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
              break;
            case "size":
              const sizeInMB = stats.size / (1024 * 1024);
              if (sizeInMB < 1) categoryDir = "small_<1MB";
              else if (sizeInMB < 10) categoryDir = "medium_1-10MB";
              else if (sizeInMB < 100) categoryDir = "large_10-100MB";
              else categoryDir = "huge_>100MB";
              break;
          }

          const categoryPath = path.join(targetDirectory, categoryDir);
          await fs.mkdir(categoryPath, { recursive: true });

          const targetPath = path.join(categoryPath, entry.name);
          await fs.copyFile(sourcePath, targetPath);
          organized++;
        } catch (error) {
          errors++;
          console.error(`Error organizing file ${entry.name}:`, error);
        }
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Files organized by ${organizeBy}`,
            summary: {
              totalFiles: files.length,
              organized,
              errors,
              sourceDirectory: sourceDir,
              targetDirectory: targetDirectory,
              organizationCriteria: organizeBy
            }
          }, null, 2)
        }]
      };

    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }],
        isError: true
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('File Extractor MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
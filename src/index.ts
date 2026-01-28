#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from 'fs/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Crear un servidor MCP
const server = new McpServer({
  name: "file-extractor",
  version: "0.1.0"
});

// Herramienta para extraer archivos de un directorio a otro
server.tool(
  "extract_files",
  {
    sourceDir: z.string().describe("Ruta del directorio fuente"),
    targetDir: z.string().describe("Ruta del directorio destino"),
    pattern: z.string().optional().describe("Patrón de archivos a extraer (ej: *.jpg, *.txt)"),
    recursive: z.boolean().optional().default(true).describe("Buscar recursivamente en subdirectorios"),
    move: z.boolean().optional().default(false).describe("Mover archivos en lugar de copiar"),
    conflictResolution: z.enum(["skip", "overwrite", "rename"]).optional().default("rename").describe("Cómo manejar conflictos de nombres")
  },
  async ({ sourceDir, targetDir, pattern, recursive, move, conflictResolution }) => {
    try {
      // Validar directorios
      const sourceStats = await fs.stat(sourceDir).catch(() => null);
      if (!sourceStats || !sourceStats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: El directorio fuente '${sourceDir}' no existe o no es un directorio válido`
          }],
          isError: true
        };
      }

      // Crear directorio destino si no existe
      await fs.mkdir(targetDir, { recursive: true });

      // Función para procesar archivos
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
              // Procesar subdirectorio recursivamente
              const result = await processFiles(fullPath, relativeEntryPath);
              processed += result.processed;
              conflicts += result.conflicts;
              errors += result.errors;
            } else if (entry.isFile()) {
              // Verificar patrón si se especificó
              if (pattern && !entry.name.match(convertPatternToRegex(pattern))) {
                continue;
              }

              const targetPath = path.join(targetDir, relativeEntryPath);
              const targetDirPath = path.dirname(targetPath);

              // Crear directorio destino si no existe
              await fs.mkdir(targetDirPath, { recursive: true });

              // Verificar si el archivo ya existe en destino
              const targetExists = await fs.stat(targetPath).catch(() => false);

              if (targetExists) {
                conflicts++;
                switch (conflictResolution) {
                  case "skip":
                    continue;
                  case "overwrite":
                    // Continuar para sobrescribir
                    break;
                  case "rename":
                    // Generar nombre único
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

              // Copiar o mover el archivo
              try {
                await copyOrMoveFile(fullPath, targetPath, move);
                processed++;
              } catch (error) {
                errors++;
                console.error(`Error procesando archivo ${fullPath}:`, error);
              }
            }
          }
        } catch (error) {
          errors++;
          console.error(`Error leyendo directorio ${currentDir}:`, error);
        }

        return { processed, conflicts, errors };
      };

      // Función auxiliar para convertir patrón glob a regex
      function convertPatternToRegex(pattern: string): RegExp {
        const escaped = pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.');
        return new RegExp(`^${escaped}$`);
      }

      // Función para copiar o mover archivo
      async function copyOrMoveFile(source: string, target: string, shouldMove: boolean): Promise<void> {
        if (shouldMove) {
          await fs.rename(source, target);
        } else {
          const sourceStream = createReadStream(source);
          const targetStream = createWriteStream(target);
          await pipeline(sourceStream, targetStream);
        }
      }

      // Procesar archivos
      const result = await processFiles(sourceDir);

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Operación completada ${move ? 'moviendo' : 'copiando'} archivos`,
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

// Herramienta para listar archivos en un directorio
server.tool(
  "list_files",
  {
    directory: z.string().describe("Ruta del directorio a listar"),
    pattern: z.string().optional().describe("Patrón de archivos a listar (ej: *.jpg, *.txt)"),
    recursive: z.boolean().optional().default(false).describe("Listar recursivamente")
  },
  async ({ directory, pattern, recursive }) => {
    try {
      const stats = await fs.stat(directory).catch(() => null);
      if (!stats || !stats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: El directorio '${directory}' no existe o no es un directorio válido`
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

          // Verificar patrón si se especificó
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

// Herramienta para organizar archivos por tipo
server.tool(
  "organize_files",
  {
    sourceDir: z.string().describe("Ruta del directorio fuente"),
    targetDir: z.string().optional().describe("Ruta del directorio destino (opcional, por defecto mismo directorio)"),
    organizeBy: z.enum(["extension", "date", "size"]).default("extension").describe("Criterio de organización")
  },
  async ({ sourceDir, targetDir, organizeBy }) => {
    try {
      const targetDirectory = targetDir || sourceDir;
      const stats = await fs.stat(sourceDir).catch(() => null);
      if (!stats || !stats.isDirectory()) {
        return {
          content: [{
            type: "text",
            text: `Error: El directorio '${sourceDir}' no existe o no es un directorio válido`
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
              const ext = path.extname(entry.name).toLowerCase() || "sin_extension";
              categoryDir = ext.startsWith('.') ? ext.slice(1) : ext;
              break;
            case "date":
              const date = stats.mtime;
              categoryDir = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
              break;
            case "size":
              const sizeInMB = stats.size / (1024 * 1024);
              if (sizeInMB < 1) categoryDir = "pequenos_<1MB";
              else if (sizeInMB < 10) categoryDir = "medianos_1-10MB";
              else if (sizeInMB < 100) categoryDir = "grandes_10-100MB";
              else categoryDir = "enormes_>100MB";
              break;
          }

          const categoryPath = path.join(targetDirectory, categoryDir);
          await fs.mkdir(categoryPath, { recursive: true });

          const targetPath = path.join(categoryPath, entry.name);
          await fs.copyFile(sourcePath, targetPath);
          organized++;
        } catch (error) {
          errors++;
          console.error(`Error organizando archivo ${entry.name}:`, error);
        }
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            message: `Archivos organizados por ${organizeBy}`,
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

// Iniciar el servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('File Extractor MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
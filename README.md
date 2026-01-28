# File Extractor MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/lalax-systems/file-extractor-mcp)

An MCP (Model Context Protocol) server for extracting, organizing, and managing files between directories. Developed by **Javier Gomez** from **Lalax Systems**.

## Description

This MCP server provides tools for:
- Extracting files from a source directory to a target directory
- Listing files in a directory with pattern filters
- Organizing files by extension, date, or size

## Available Tools

### 1. `extract_files`
Extracts files from a source directory to a target directory.

**Parameters:**
- `sourceDir` (string): Path to the source directory
- `targetDir` (string): Path to the target directory
- `pattern` (string, optional): File pattern to extract (e.g., `*.jpg`, `*.txt`)
- `recursive` (boolean, optional): Search recursively in subdirectories (default: `true`)
- `move` (boolean, optional): Move files instead of copying (default: `false`)
- `conflictResolution` (string, optional): How to handle name conflicts:
  - `"skip"`: Skip files with duplicate names
  - `"overwrite"`: Overwrite existing files
  - `"rename"`: Rename files with numerical suffix (default)

**Usage example:**
```json
{
  "sourceDir": "/path/to/source",
  "targetDir": "/path/to/target",
  "pattern": "*.jpg",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

### 2. `list_files`
Lists files in a directory with detailed information.

**Parameters:**
- `directory` (string): Path to the directory to list
- `pattern` (string, optional): File pattern to list (e.g., `*.jpg`, `*.txt`)
- `recursive` (boolean, optional): List recursively (default: `false`)

**Usage example:**
```json
{
  "directory": "/path/to/directory",
  "pattern": "*.txt",
  "recursive": true
}
```

### 3. `organize_files`
Organizes files by specific criteria.

**Parameters:**
- `sourceDir` (string): Path to the source directory
- `targetDir` (string, optional): Path to the target directory (default: same as source directory)
- `organizeBy` (string, optional): Organization criteria:
  - `"extension"`: Organize by file extension (default)
  - `"date"`: Organize by modification date (year-month)
  - `"size"`: Organize by file size

**Usage example:**
```json
{
  "sourceDir": "/path/to/source",
  "targetDir": "/path/to/target",
  "organizeBy": "extension"
}
```

## Installation

### From GitHub

```bash
# Clone the repository
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### Configuration in Kilo Code

Add to the MCP configuration file (`mcp_settings.json`):

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/full/path/to/file-extractor-mcp/build/index.js"],
      "disabled": false,
      "alwaysAllow": [],
      "description": "MCP server for extracting files from directories and moving them to another directory"
    }
  }
}
```

### Configuration in VSCode Forks (Cursor, Cline, Windsurf, etc.)

This MCP server is compatible with any VSCode fork that supports MCP servers. Add the following to your MCP configuration file (location varies by editor):

**For Cursor**: `~/.cursor/mcp.json`
**For Windsurf**: `~/.windsurf/mcp.json`
**For Cline**: `~/.cline/mcp.json`

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/full/path/to/file-extractor-mcp/build/index.js"],
      "disabled": false
    }
  }
}
```

### Global Installation (optional)

```bash
npm install -g @lalax-systems/file-extractor-mcp
```

The server runs automatically when Kilo Code or compatible editors start.

## Project Structure

```
file-extractor/
├── src/
│   └── index.ts          # Main server implementation
├── build/
│   └── index.js          # Compiled code
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This documentation
```

## Development

To modify the server:

1. Edit the `src/index.ts` file
2. Run `npm run build` to compile
3. Restart Kilo Code or your editor to load changes

## Usage Examples

### Extract all JPG images:
```bash
# Using the extract_files tool
sourceDir: "/home/user/photos"
targetDir: "/home/user/backup"
pattern: "*.jpg"
recursive: true
```

### Organize documents by extension:
```bash
# Using the organize_files tool
sourceDir: "/home/user/downloads"
organizeBy: "extension"
```

### List PDF files in a directory:
```bash
# Using the list_files tool
directory: "/home/user/documents"
pattern: "*.pdf"
recursive: false
```

## Notes

- The server automatically creates target directories
- Supports recursive operations in subdirectories
- Provides name conflict resolution
- Returns structured JSON with detailed results

## About

**Developer**: Javier Gomez  
**Company**: Lalax Systems  
**Repository**: https://github.com/lalax-systems/file-extractor-mcp  
**Website**: https://www.lalax.com

This project is part of the MCP tools ecosystem developed by Lalax Systems to improve productivity and automation in software development.

## Contributions

Contributions are welcome. Please open an issue or pull request on GitHub.

## License

MIT License - Copyright (c) 2026 Javier Gomez - Lalax Systems
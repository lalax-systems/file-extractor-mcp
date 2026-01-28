# File Extractor MCP Server Usage Guide

This guide explains how to use the File Extractor MCP Server in different environments.

## Quick Setup

### 1. Local Installation

```bash
# Clone the repository
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Configuration in Kilo Code

Edit the MCP configuration file (`mcp_settings.json`) and add:

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

### 3. Configuration in VSCode Forks

This MCP server is compatible with any VSCode fork that supports MCP servers:

**Cursor**: `~/.cursor/mcp.json`
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

**Windsurf**: `~/.windsurf/mcp.json`
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

**Cline**: `~/.cline/mcp.json`
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

**Other VSCode forks**: Check your editor's documentation for MCP configuration file location.

### 4. Restart Your Editor

Restart Kilo Code or your compatible editor to load the new MCP server.

## Usage Examples

### Example 1: Extract all JPG images

```bash
# Using the extract_files tool
{
  "sourceDir": "/home/user/photos",
  "targetDir": "/home/user/backup",
  "pattern": "*.jpg",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

### Example 2: Organize documents by extension

```bash
# Using the organize_files tool
{
  "sourceDir": "/home/user/downloads",
  "organizeBy": "extension"
}
```

### Example 3: List PDF files in a directory

```bash
# Using the list_files tool
{
  "directory": "/home/user/documents",
  "pattern": "*.pdf",
  "recursive": false
}
```

## Available Tools

### 1. `extract_files`

Extracts files from a source directory to a target directory.

**Parameters:**
- `sourceDir`: Path to source directory (required)
- `targetDir`: Path to target directory (required)
- `pattern`: File pattern (e.g., `*.jpg`, `*.txt`) (optional)
- `recursive`: Search in subdirectories (default: `true`)
- `move`: Move instead of copy (default: `false`)
- `conflictResolution`: Conflict handling (`skip`, `overwrite`, `rename`) (default: `rename`)

### 2. `list_files`

Lists files in a directory with detailed information.

**Parameters:**
- `directory`: Path to directory (required)
- `pattern`: File pattern (optional)
- `recursive`: List recursively (default: `false`)

### 3. `organize_files`

Organizes files by specific criteria.

**Parameters:**
- `sourceDir`: Path to source directory (required)
- `targetDir`: Path to target directory (optional, default: same directory)
- `organizeBy`: Criteria (`extension`, `date`, `size`) (default: `extension`)

## Common Use Cases

### 1. Photo Backup

```bash
# Copy all photos to a backup directory
extract_files({
  sourceDir: "/home/user/photos",
  targetDir: "/backup/photos",
  pattern: "*.{jpg,png,gif}",
  recursive: true,
  move: false,
  conflictResolution: "rename"
})
```

### 2. Download Organization

```bash
# Organize downloaded files by type
organize_files({
  sourceDir: "/home/user/downloads",
  organizeBy: "extension"
})
```

### 3. Temporary File Cleanup

```bash
# Move old temporary files
extract_files({
  sourceDir: "/tmp",
  targetDir: "/home/user/temp_backup",
  pattern: "*.tmp",
  recursive: true,
  move: true,
  conflictResolution: "overwrite"
})
```

## Troubleshooting

### Error: "Directory does not exist"
- Verify the path is correct
- Ensure the directory exists
- Check read/write permissions

### Error: "Permission denied"
- Run with appropriate permissions
- Check directory permissions
- Consider using `sudo` if necessary

### Server doesn't start
- Verify Node.js is installed (version 18+)
- Check all dependencies are installed
- Verify the path in MCP configuration

## Best Practices

1. **Always make backups** before using `move: true`
2. **Test with `recursive: false`** first to see results
3. **Use `conflictResolution: "rename"`** to avoid overwriting important files
4. **Verify patterns** with `list_files` before extracting

## Support

For issues or questions:
- Open an issue on GitHub: https://github.com/lalax-systems/file-extractor-mcp/issues
- Contact the developer: info@lalax.com

## Contributions

Contributions are welcome. Please:
1. Fork the repository
2. Create a branch for your feature
3. Commit your changes
4. Open a Pull Request
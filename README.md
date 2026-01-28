# 🗂️ File Extractor MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/lalax-systems/file-extractor-mcp)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://spec.modelcontextprotocol.io/)

**Professional MCP server for file management and automation** - Extract, organize, and manage files between directories with AI-powered tools. Developed by **Javier Gomez**.

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp
npm install
npm run build
```

### Configuration (Kilo Code)
Add to `mcp_settings.json`:
```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/path/to/file-extractor-mcp/build/index.js"],
      "disabled": false
    }
  }
}
```

## 💡 Prompt Usage Examples

### Example 1: Extract Photos
```
I need to backup all my photos. Please use the file-extractor MCP to:

Extract all JPG and PNG files from my camera folder to a backup directory:

- sourceDir: "/home/user/photos/camera"
- targetDir: "/home/user/backup/photos"
- pattern: "*.{jpg,png}"
- recursive: true
- move: false
- conflictResolution: "rename"
```

### Example 2: Organize Downloads
```
My downloads folder is a mess. Please organize all files by extension:

Use the organize_files tool with:
- sourceDir: "/home/user/Downloads"
- organizeBy: "extension"
```

### Example 3: Find Large Files
```
I need to find all large video files for cleanup:

Use the list_files tool with:
- directory: "/home/user/videos"
- pattern: "*.{mp4,avi,mkv}"
- recursive: true
```

## 🔧 Available Tools

### 1. `extract_files` - Smart File Extraction
Extract files with pattern matching and conflict resolution.

**Parameters:**
- `sourceDir` (string): Source directory path
- `targetDir` (string): Target directory path  
- `pattern` (string, optional): File pattern (e.g., `*.jpg`, `*.{txt,md}`)
- `recursive` (boolean, optional): Search subdirectories (default: `true`)
- `move` (boolean, optional): Move instead of copy (default: `false`)
- `conflictResolution` (string, optional): `"skip"`, `"overwrite"`, or `"rename"` (default)

### 2. `list_files` - Directory Analysis
List files with filtering and detailed information.

**Parameters:**
- `directory` (string): Directory to analyze
- `pattern` (string, optional): Filter pattern
- `recursive` (boolean, optional): Recursive listing (default: `false`)

### 3. `organize_files` - Automated Organization
Organize files by extension, date, or size.

**Parameters:**
- `sourceDir` (string): Source directory
- `targetDir` (string, optional): Target directory (default: same as source)
- `organizeBy` (string, optional): `"extension"` (default), `"date"`, or `"size"`

## 📊 Real-World Use Cases

### 🖼️ **Photo Management**
```bash
# Backup vacation photos
sourceDir: "/media/camera/DCIM/2025-vacation"
targetDir: "/cloud/backup/photos"
pattern: "*.{jpg,raw,cr2}"
recursive: true
```

### 📁 **Project Cleanup**
```bash
# Archive old project files
sourceDir: "/projects/old-project"
targetDir: "/archive/projects"
pattern: "*.{log,tmp,bak}"
move: true
```

### 🗄️ **Document Organization**
```bash
# Organize work documents
sourceDir: "/work/documents"
organizeBy: "extension"
```

## 🛠️ Technical Features

- **✅ Recursive Operations**: Process nested directories automatically
- **✅ Pattern Matching**: Support for glob patterns (`*.jpg`, `*.{txt,md}`)
- **✅ Conflict Resolution**: Skip, overwrite, or rename duplicate files
- **✅ Cross-Platform**: Works on Windows, macOS, and Linux
- **✅ MCP Standard**: Compatible with any MCP client
- **✅ TypeScript**: Full type safety and modern development

## 📋 Compatibility

### ✅ **AI Agents**
- Kilo Code
- Claude Desktop
- Cursor AI
- Any MCP-compatible AI agent

### ✅ **VSCode Forks**
- Cursor
- Windsurf  
- Cline
- Any editor with MCP support

## 🏗️ Project Structure

```
file-extractor-mcp/
├── src/
│   └── index.ts          # Core server implementation
├── build/
│   └── index.js          # Compiled production code
├── docs/
│   ├── USAGE.md          # Detailed usage guide
│   └── INSTALLATION.md   # Installation instructions
├── package.json          # Dependencies and metadata
├── tsconfig.json         # TypeScript configuration
└── README.md            # This documentation
```

## 🚀 Getting Started

### 1. Clone & Build
```bash
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp
npm install
npm run build
```

### 2. Configure Your Client
**Kilo Code**: Edit `~/.config/Kilo-Code/mcp_settings.json`  
**Cursor**: Edit `~/.cursor/mcp.json`  
**Windsurf**: Edit `~/.windsurf/mcp.json`

### 3. Start Using
The tools will be available in your AI agent's prompt interface.

## 🔍 Advanced Examples

### Batch Processing
```bash
# Process multiple directories
for dir in /data/*/; do
  # Extract PDFs from each directory
  sourceDir: "$dir"
  targetDir: "/archive/pdfs"
  pattern: "*.pdf"
  recursive: true
done
```

### Automated Backup Script
```bash
# Daily backup script
sourceDir: "/important/documents"
targetDir: "/backup/daily-$(date +%Y%m%d)"
pattern: "*"
recursive: true
move: false
conflictResolution: "rename"
```

## 📈 Performance

- **Fast**: Uses Node.js streams for efficient file operations
- **Reliable**: Comprehensive error handling and logging
- **Scalable**: Handles thousands of files efficiently
- **Safe**: Non-destructive operations by default

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - Copyright (c) 2026 Javier Gomez

See [LICENSE](LICENSE) for full details.

## 🌐 Links

- **Repository**: https://github.com/lalax-systems/file-extractor-mcp
- **Issues**: https://github.com/lalax-systems/file-extractor-mcp/issues
- **MCP Documentation**: https://spec.modelcontextprotocol.io/

## ⭐ Show Your Support

If this project helps you, please give it a star on GitHub!

---

**Built with ❤️ by Javier Gomez**  
*Making file management smarter with AI*
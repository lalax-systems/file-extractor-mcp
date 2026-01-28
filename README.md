# 🗂️ File Extractor MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/lalax-systems/file-extractor-mcp)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://spec.modelcontextprotocol.io/)
[![Version](https://img.shields.io/badge/Version-0.2.0-orange.svg)](https://github.com/lalax-systems/file-extractor-mcp)

**Professional MCP server for file management and GitHub repository automation** - Extract, organize, and manage files between directories with AI-powered tools. Developed by **Javier Gomez**.

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

### Example 2: Clean GitHub Repositories
```
I want to delete all my GitHub repositories except "file-extractor-mcp":

Use the delete_all_github_repositories_except tool with:
- token: "github_pat_..."
- username: "lalax-systems"
- keepRepository: "file-extractor-mcp"
- confirm: true
```

### Example 3: Organize Downloads
```
My downloads folder is a mess. Please organize all files by extension:

Use the organize_files tool with:
- sourceDir: "/home/user/Downloads"
- organizeBy: "extension"
```

## 🔧 Available Tools

### 📁 **File Management Tools**

#### 1. `extract_files` - Smart File Extraction
Extract files with pattern matching and conflict resolution.

**Parameters:**
- `sourceDir` (string): Source directory path
- `targetDir` (string): Target directory path  
- `pattern` (string, optional): File pattern (e.g., `*.jpg`, `*.{txt,md}`)
- `recursive` (boolean, optional): Search subdirectories (default: `true`)
- `move` (boolean, optional): Move instead of copy (default: `false`)
- `conflictResolution` (string, optional): `"skip"`, `"overwrite"`, or `"rename"` (default)

#### 2. `list_files` - Directory Analysis
List files with filtering and detailed information.

**Parameters:**
- `directory` (string): Directory to analyze
- `pattern` (string, optional): Filter pattern
- `recursive` (boolean, optional): Recursive listing (default: `false`)

#### 3. `organize_files` - Automated Organization
Organize files by extension, date, or size.

**Parameters:**
- `sourceDir` (string): Source directory
- `targetDir` (string, optional): Target directory (default: same as source)
- `organizeBy` (string, optional): `"extension"` (default), `"date"`, or `"size"`

### 🐙 **GitHub Management Tools**

#### 4. `list_github_repositories` - Repository Listing
List all GitHub repositories for a user.

**Parameters:**
- `token` (string): GitHub Personal Access Token (with `repo` scope)
- `username` (string, optional): GitHub username (default: authenticated user)

#### 5. `delete_github_repository` - Single Repository Deletion
Delete a specific GitHub repository.

**Parameters:**
- `token` (string): GitHub Personal Access Token (with `repo` scope)
- `owner` (string): Repository owner (user or organization)
- `repo` (string): Repository name to delete
- `confirm` (boolean): Must be `true` to proceed (safety measure)

#### 6. `delete_all_github_repositories_except` - Bulk Repository Cleanup
Delete all repositories except one specified repository.

**Parameters:**
- `token` (string): GitHub Personal Access Token (with `repo` scope)
- `username` (string): GitHub username
- `keepRepository` (string): Repository name to keep (not delete)
- `confirm` (boolean): Must be `true` to proceed (safety measure)

## ⚠️ **Important Security Notes**

### GitHub Token Requirements:
- **Scope**: `repo` (full control of private repositories)
- **Permissions**: Delete repositories
- **Safety**: Tokens should be kept secure and never shared

### Deletion Safety Features:
1. **Confirmation Required**: `confirm: true` parameter is mandatory
2. **Selective Deletion**: Can keep specific repositories
3. **Error Handling**: Detailed error messages for failed operations
4. **Audit Trail**: Returns detailed results of all operations

## 📊 Real-World Use Cases

### 🖼️ **Photo Management**
```bash
# Backup vacation photos
sourceDir: "/media/camera/DCIM/2025-vacation"
targetDir: "/cloud/backup/photos"
pattern: "*.{jpg,raw,cr2}"
recursive: true
```

### 🧹 **GitHub Account Cleanup**
```bash
# Keep only the main project
token: "github_pat_..."
username: "lalax-systems"
keepRepository: "file-extractor-mcp"
confirm: true
```

### 📁 **Project Archive**
```bash
# Archive old project files
sourceDir: "/projects/old-project"
targetDir: "/archive/projects"
pattern: "*.{log,tmp,bak}"
move: true
```

## 🛠️ Technical Features

- **✅ Recursive Operations**: Process nested directories automatically
- **✅ Pattern Matching**: Support for glob patterns (`*.jpg`, `*.{txt,md}`)
- **✅ Conflict Resolution**: Skip, overwrite, or rename duplicate files
- **✅ GitHub Integration**: Full repository management via Octokit
- **✅ Cross-Platform**: Works on Windows, macOS, and Linux
- **✅ MCP Standard**: Compatible with any MCP client
- **✅ TypeScript**: Full type safety and modern development
- **✅ Safety First**: Confirmation required for destructive operations

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

### GitHub Token Creation
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope (full control)
3. Copy the token and use it in the tools

### Bulk Repository Management
```bash
# List all repositories first
token: "github_pat_..."
username: "lalax-systems"

# Then delete all except one
token: "github_pat_..."
username: "lalax-systems"
keepRepository: "file-extractor-mcp"
confirm: true
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
- **Secure**: GitHub operations require explicit confirmation

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

## ⚠️ **Warning**

**GitHub repository deletion is permanent and irreversible.** Use the deletion tools with extreme caution. Always:
1. Backup important repositories
2. Double-check repository names
3. Use the `confirm: true` parameter carefully
4. Consider archiving instead of deleting

## ⭐ Show Your Support

If this project helps you, please give it a star on GitHub!

---

**Built with ❤️ by Javier Gomez**  
*Making file and repository management smarter with AI*
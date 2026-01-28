# Installation Guide - File Extractor MCP Server

This guide provides detailed installation instructions for the File Extractor MCP Server across different platforms and editors.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Kilo Code Installation](#kilo-code-installation)
4. [VSCode Forks Installation](#vscode-forks-installation)
5. [Global Installation](#global-installation)
6. [Development Installation](#development-installation)
7. [Verification](#verification)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the File Extractor MCP Server, ensure you have:

1. **Node.js** (version 16 or higher)
   ```bash
   node --version
   # Should show v16.x.x or higher
   ```

2. **npm** (Node Package Manager)
   ```bash
   npm --version
   # Should show 8.x.x or higher
   ```

3. **Git** (for cloning the repository)
   ```bash
   git --version
   ```

4. **MCP-compatible client**:
   - Kilo Code (AI agent)
   - Cursor (VSCode fork)
   - Windsurf (VSCode fork)
   - Cline (VSCode fork)
   - Or any other client supporting MCP servers

## Installation Methods

### Method 1: From GitHub (Recommended)

This is the recommended method for most users.

```bash
# Clone the repository
git clone https://github.com/lalax-systems/file-extractor-mcp.git

# Navigate to the project directory
cd file-extractor-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### Method 2: Using npm (if published)

```bash
# Install globally
npm install -g @lalax-systems/file-extractor-mcp

# Or install locally in your project
npm install @lalax-systems/file-extractor-mcp
```

### Method 3: Manual Download

1. Download the latest release from [GitHub Releases](https://github.com/lalax-systems/file-extractor-mcp/releases)
2. Extract the archive
3. Navigate to the extracted directory
4. Run `npm install` and `npm run build`

## Kilo Code Installation

### Step 1: Configure MCP Settings

1. Open Kilo Code configuration
2. Navigate to the MCP settings file:
   - Location: `~/.config/Kilo-Code/mcp_settings.json` (Linux/macOS)
   - Location: `%APPDATA%\Kilo-Code\mcp_settings.json` (Windows)

3. Add the File Extractor MCP Server configuration:

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

**Important**: Replace `/full/path/to/file-extractor-mcp` with the actual path to your installation.

### Step 2: Restart Kilo Code

Restart Kilo Code to load the new MCP server configuration.

### Step 3: Verify Installation

1. Open Kilo Code
2. Check if the MCP server is loaded (usually visible in the MCP status panel)
3. Try using one of the tools to verify functionality

## VSCode Forks Installation

The File Extractor MCP Server is compatible with various VSCode forks that support MCP servers.

### Cursor Installation

1. **Install the server** (follow Method 1 above)
2. **Configure Cursor**:
   - Create or edit the MCP configuration file:
     - Linux/macOS: `~/.cursor/mcp.json`
     - Windows: `%USERPROFILE%\.cursor\mcp.json`

3. **Add configuration**:

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

4. **Restart Cursor**

### Windsurf Installation

1. **Install the server** (follow Method 1 above)
2. **Configure Windsurf**:
   - Create or edit the MCP configuration file:
     - Linux/macOS: `~/.windsurf/mcp.json`
     - Windows: `%USERPROFILE%\.windsurf\mcp.json`

3. **Add configuration**:

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

4. **Restart Windsurf**

### Cline Installation

1. **Install the server** (follow Method 1 above)
2. **Configure Cline**:
   - Create or edit the MCP configuration file:
     - Linux/macOS: `~/.cline/mcp.json`
     - Windows: `%USERPROFILE%\.cline\mcp.json`

3. **Add configuration**:

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

4. **Restart Cline**

### Other VSCode Forks

For other VSCode forks that support MCP servers:

1. Check the editor's documentation for MCP configuration
2. Look for MCP configuration files in:
   - `~/.config/[editor-name]/`
   - `~/.local/share/[editor-name]/`
   - `%APPDATA%\[editor-name]\`

3. Add similar configuration as above

## Global Installation

For system-wide installation:

### Step 1: Install Globally

```bash
# Clone and build
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp
npm install
npm run build

# Create a global symlink or copy
sudo npm link
# or
sudo cp -r build /usr/local/lib/file-extractor-mcp
```

### Step 2: Configure Clients

Configure each client to use the global installation:

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/usr/local/lib/file-extractor-mcp/build/index.js"],
      "disabled": false
    }
  }
}
```

## Development Installation

For developers who want to modify the server:

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Install dependencies
npm install

# Install development dependencies
npm install --save-dev @types/node typescript
```

### Step 2: Make Changes

1. Edit the source code in `src/index.ts`
2. Modify tool implementations as needed
3. Update documentation if necessary

### Step 3: Build and Test

```bash
# Build the project
npm run build

# Test the server directly
node build/index.js
```

### Step 4: Update Configuration

Update your client's MCP configuration to point to your development build:

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/path/to/your/development/file-extractor-mcp/build/index.js"],
      "disabled": false
    }
  }
}
```

## Verification

### Test the Installation

1. **Check if server runs**:
   ```bash
   cd /path/to/file-extractor-mcp
   node build/index.js
   # Should start without errors
   ```

2. **Verify in your client**:
   - Open your MCP client
   - Check if MCP tools are available
   - Try a simple command like listing files

3. **Test with a simple operation**:
   ```bash
   # Create test directories
   mkdir -p /tmp/test_source
   mkdir -p /tmp/test_target
   touch /tmp/test_source/test1.txt /tmp/test_source/test2.txt
   ```

   Use the `extract_files` tool with:
   - `sourceDir`: `/tmp/test_source`
   - `targetDir`: `/tmp/test_target`
   - `pattern`: `*.txt`
   - `recursive`: `false`

### Common Verification Steps

1. **Check Node.js version**:
   ```bash
   node --version
   ```

2. **Check npm version**:
   ```bash
   npm --version
   ```

3. **Verify build output**:
   ```bash
   ls -la build/
   # Should contain index.js
   ```

4. **Check MCP configuration**:
   ```bash
   cat ~/.config/Kilo-Code/mcp_settings.json
   # Or equivalent for your client
   ```

## Troubleshooting

### Common Issues

#### 1. "Command not found: node"
- **Cause**: Node.js is not installed or not in PATH
- **Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

#### 2. "Cannot find module"
- **Cause**: Dependencies not installed
- **Solution**: Run `npm install` in the project directory

#### 3. "Permission denied"
- **Cause**: Insufficient permissions
- **Solution**: Use `sudo` or fix directory permissions

#### 4. MCP server not loading
- **Cause**: Configuration error or path incorrect
- **Solution**:
  - Check the path in MCP configuration
  - Verify the server runs manually
  - Check client logs for errors

#### 5. "TypeError: Cannot read properties of undefined"
- **Cause**: MCP SDK version mismatch
- **Solution**: Update dependencies with `npm update`

### Debug Steps

1. **Run server manually**:
   ```bash
   cd /path/to/file-extractor-mcp
   node build/index.js
   ```

2. **Check client logs**:
   - Look for MCP-related logs in your client
   - Check console output

3. **Verify paths**:
   ```bash
   # Check if build file exists
   ls -la /path/to/file-extractor-mcp/build/index.js
   
   # Check if Node.js can execute it
   node /path/to/file-extractor-mcp/build/index.js
   ```

4. **Test with minimal configuration**:
   ```json
   {
     "mcpServers": {
       "file-extractor": {
         "command": "node",
         "args": ["/absolute/path/to/build/index.js"]
       }
     }
   }
   ```

### Getting Help

If you encounter issues:

1. **Check the documentation**: Review this guide and the README.md
2. **Check GitHub Issues**: Look for similar issues at [GitHub Issues](https://github.com/lalax-systems/file-extractor-mcp/issues)
3. **Create a new issue**: If the problem persists, create a new issue with:
   - Your operating system
   - Client and version
   - Node.js version
   - Error messages
   - Steps to reproduce

## Support

For additional support, please visit the [GitHub repository](https://github.com/lalax-systems/file-extractor-mcp).

**Developer**: Javier Gomez
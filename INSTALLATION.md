# Installation Guide for VSCode Forks

This guide provides detailed installation instructions for various VSCode forks that support MCP servers.

## Supported Editors

The File Extractor MCP Server is compatible with the following editors:

- **Kilo Code** - Primary development environment
- **Cursor** - AI-powered code editor
- **Windsurf** - AI-native code editor
- **Cline** - AI-assisted development environment
- **Any VSCode fork** that supports MCP servers

## Installation Steps

### 1. Clone and Build

```bash
# Clone the repository
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Editor-Specific Configuration

#### Kilo Code
Configuration file: `mcp_settings.json` (location varies by system)

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/full/path/to/file-extractor-mcp/build/index.js"],
      "disabled": false,
      "alwaysAllow": [],
      "description": "MCP server for extracting files from directories"
    }
  }
}
```

#### Cursor
Configuration file: `~/.cursor/mcp.json`

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

#### Windsurf
Configuration file: `~/.windsurf/mcp.json`

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

#### Cline
Configuration file: `~/.cline/mcp.json`

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

### 3. Global Installation (Alternative)

You can install the server globally for easier access:

```bash
# Install globally
npm install -g @lalax-systems/file-extractor-mcp

# Then use the global path in your configuration
{
  "mcpServers": {
    "file-extractor": {
      "command": "file-extractor-mcp",
      "disabled": false
    }
  }
}
```

### 4. Verify Installation

After configuring your editor, restart it and verify the server is running:

1. Open your editor
2. Check the MCP server status (usually in settings or extensions)
3. Try using one of the tools:
   - `extract_files`
   - `list_files`
   - `organize_files`

## Configuration File Locations

| Editor | Configuration File Path | Notes |
|--------|------------------------|-------|
| Kilo Code | `~/Library/Application Support/Code/User/globalStorage/kilocode.kilo-code/settings/mcp_settings.json` (macOS) | Location varies by OS |
| Cursor | `~/.cursor/mcp.json` | Create if doesn't exist |
| Windsurf | `~/.windsurf/mcp.json` | Create if doesn't exist |
| Cline | `~/.cline/mcp.json` | Create if doesn't exist |
| Other VSCode forks | Check editor documentation | Usually in user config directory |

## Troubleshooting

### Server not starting
1. Verify Node.js is installed (version 18+)
2. Check the path in your configuration file
3. Ensure the build was successful (`npm run build`)
4. Check editor logs for error messages

### Permission issues
```bash
# Make the built file executable
chmod +x /path/to/file-extractor-mcp/build/index.js
```

### Path issues
Use absolute paths in your configuration:
```json
{
  "command": "node",
  "args": ["/home/user/projects/file-extractor-mcp/build/index.js"]
}
```

## Advanced Configuration

### Environment Variables
You can set environment variables in your configuration:

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/path/to/build/index.js"],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

### Multiple Instances
You can run multiple instances with different configurations:

```json
{
  "mcpServers": {
    "file-extractor-backup": {
      "command": "node",
      "args": ["/path/to/build/index.js"],
      "description": "Backup configuration"
    },
    "file-extractor-organize": {
      "command": "node",
      "args": ["/path/to/build/index.js"],
      "description": "Organization configuration"
    }
  }
}
```

## Uninstallation

To remove the server:

1. Remove the configuration from your editor's MCP settings file
2. Optionally uninstall the global package:
   ```bash
   npm uninstall -g @lalax-systems/file-extractor-mcp
   ```
3. Delete the cloned repository if no longer needed

## Support

For installation issues:
- Check the [GitHub Issues](https://github.com/lalax-systems/file-extractor-mcp/issues)
- Contact: info@lalax.com
- Visit: https://www.lalax.com
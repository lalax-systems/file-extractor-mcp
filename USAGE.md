# Usage Guide - File Extractor MCP Server

This guide provides detailed instructions on how to use the File Extractor MCP Server tools effectively.

## Table of Contents

1. [Introduction](#introduction)
2. [Tool Overview](#tool-overview)
3. [extract_files Tool](#extract_files-tool)
4. [list_files Tool](#list_files-tool)
5. [organize_files Tool](#organize_files-tool)
6. [Examples](#examples)
7. [Troubleshooting](#troubleshooting)

## Introduction

The File Extractor MCP Server provides three main tools for file management operations. These tools can be accessed through any MCP-compatible client like Kilo Code, Cursor, Windsurf, or Cline.

## Tool Overview

### 1. `extract_files`
Extracts files matching a pattern from a source directory to a target directory.

### 2. `list_files`
Lists files in a directory with optional filtering.

### 3. `organize_files`
Organizes files by extension, date, or size.

## extract_files Tool

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sourceDir` | string | Yes | - | Path to the source directory |
| `targetDir` | string | Yes | - | Path to the target directory |
| `pattern` | string | No | `*` (all files) | File pattern to extract (e.g., `*.jpg`, `*.txt`) |
| `recursive` | boolean | No | `true` | Search recursively in subdirectories |
| `move` | boolean | No | `false` | Move files instead of copying |
| `conflictResolution` | string | No | `"rename"` | How to handle name conflicts: `"skip"`, `"overwrite"`, or `"rename"` |

### Conflict Resolution Strategies

1. **`"skip"`**: Skip files with duplicate names
   - Example: If `photo.jpg` already exists in target, skip the source file
   - Useful for non-destructive operations

2. **`"overwrite"`**: Overwrite existing files
   - Example: Replace existing `photo.jpg` with the source file
   - Use with caution as data may be lost

3. **`"rename"`**: Rename files with numerical suffix (default)
   - Example: `photo.jpg` → `photo (1).jpg`, `photo (2).jpg`, etc.
   - Safest option, preserves all files

### Pattern Examples

- `*.jpg` - All JPG files
- `*.txt` - All text files
- `*.pdf` - All PDF files
- `*.{jpg,png,gif}` - Multiple image formats
- `report_*.docx` - Word documents starting with "report_"
- `2024-*.xlsx` - Excel files starting with "2024-"

### Usage Examples

**Basic extraction:**
```json
{
  "sourceDir": "/home/user/documents",
  "targetDir": "/home/user/backup",
  "pattern": "*.pdf",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

**Move files instead of copy:**
```json
{
  "sourceDir": "/home/user/downloads",
  "targetDir": "/home/user/archive",
  "pattern": "*.tmp",
  "recursive": true,
  "move": true,
  "conflictResolution": "overwrite"
}
```

**Non-recursive extraction:**
```json
{
  "sourceDir": "/home/user/photos",
  "targetDir": "/home/user/selected",
  "pattern": "*.jpg",
  "recursive": false,
  "move": false,
  "conflictResolution": "skip"
}
```

## list_files Tool

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `directory` | string | Yes | - | Path to the directory to list |
| `pattern` | string | No | `*` (all files) | File pattern to list |
| `recursive` | boolean | No | `false` | List recursively |

### Return Value

Returns an array of file objects with the following structure:
```json
[
  {
    "name": "file1.jpg",
    "path": "/full/path/to/file1.jpg",
    "size": 1024,
    "type": "file"
  },
  {
    "name": "subdirectory",
    "path": "/full/path/to/subdirectory",
    "type": "directory"
  }
]
```

### Usage Examples

**List all files in a directory:**
```json
{
  "directory": "/home/user/documents",
  "pattern": "*",
  "recursive": false
}
```

**List PDF files recursively:**
```json
{
  "directory": "/home/user/projects",
  "pattern": "*.pdf",
  "recursive": true
}
```

**List image files:**
```json
{
  "directory": "/home/user/photos",
  "pattern": "*.{jpg,png,gif}",
  "recursive": true
}
```

## organize_files Tool

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `sourceDir` | string | Yes | - | Path to the source directory |
| `targetDir` | string | No | Same as source | Path to the target directory |
| `organizeBy` | string | No | `"extension"` | Organization criteria: `"extension"`, `"date"`, or `"size"` |

### Organization Methods

1. **`"extension"`** (default):
   - Files are organized into folders named after their extensions
   - Example: `.jpg` files go to `jpg/`, `.pdf` files go to `pdf/`, etc.
   - Structure: `targetDir/jpg/file1.jpg`, `targetDir/pdf/document.pdf`

2. **`"date"`**:
   - Files are organized by modification date (year-month)
   - Example: Files modified in January 2024 go to `2024-01/`
   - Structure: `targetDir/2024-01/file1.jpg`, `targetDir/2024-02/document.pdf`

3. **`"size"`**:
   - Files are organized by size categories:
     - `tiny/`: < 1KB
     - `small/`: 1KB - 1MB
     - `medium/`: 1MB - 100MB
     - `large/`: > 100MB
   - Structure: `targetDir/small/file1.txt`, `targetDir/large/video.mp4`

### Usage Examples

**Organize by extension:**
```json
{
  "sourceDir": "/home/user/downloads",
  "targetDir": "/home/user/organized",
  "organizeBy": "extension"
}
```

**Organize by date in same directory:**
```json
{
  "sourceDir": "/home/user/photos",
  "organizeBy": "date"
}
```

**Organize by size:**
```json
{
  "sourceDir": "/home/user/data",
  "targetDir": "/home/user/sorted",
  "organizeBy": "size"
}
```

## Examples

### Example 1: Backup Photos

**Scenario**: Backup all photos from a camera to an external drive.

```json
{
  "sourceDir": "/media/camera/DCIM",
  "targetDir": "/media/external/backup/photos",
  "pattern": "*.{jpg,jpeg,png,raw}",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

### Example 2: Clean Temporary Files

**Scenario**: Move all temporary files to a trash folder.

```json
{
  "sourceDir": "/home/user/project",
  "targetDir": "/home/user/trash",
  "pattern": "*.{tmp,log,bak}",
  "recursive": true,
  "move": true,
  "conflictResolution": "overwrite"
}
```

### Example 3: Organize Downloads Folder

**Scenario**: Organize downloads by file type.

```json
{
  "sourceDir": "/home/user/Downloads",
  "targetDir": "/home/user/Downloads_organized",
  "organizeBy": "extension"
}
```

### Example 4: Find Large Files

**Scenario**: List all large video files.

```json
{
  "directory": "/home/user/videos",
  "pattern": "*.{mp4,avi,mkv,mov}",
  "recursive": true
}
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   - Ensure you have read access to source directory
   - Ensure you have write access to target directory

2. **Directory Not Found**
   - Verify paths are correct and exist
   - Use absolute paths for reliability

3. **No Files Found**
   - Check if pattern matches file extensions
   - Verify recursive setting if files are in subdirectories

4. **Conflict Resolution Not Working as Expected**
   - Understand the difference between skip, overwrite, and rename
   - Check if target directory already contains files with same names

### Best Practices

1. **Test First**: Use `list_files` to see what files will be affected
2. **Backup**: Always have a backup before using `move: true`
3. **Use Absolute Paths**: More reliable than relative paths
4. **Start Small**: Test with a small directory first
5. **Monitor Progress**: Large operations may take time

### Error Messages

- `ENOENT: no such file or directory` - Check if source/target directories exist
- `EACCES: permission denied` - Check file permissions
- `Pattern syntax error` - Check pattern format (e.g., `*.{jpg,png}` not `*.{jpg,png}`)
- `Target directory is inside source directory` - Avoid recursive copying

## Support

For issues or questions, please visit the [GitHub repository](https://github.com/lalax-systems/file-extractor-mcp) or contact the developer.

**Developer**: Javier Gomez
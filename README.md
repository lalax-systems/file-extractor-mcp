# File Extractor MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/lalax-systems/file-extractor-mcp)

Un servidor MCP (Model Context Protocol) para extraer, organizar y gestionar archivos entre directorios. Desarrollado por **Javier Gomez** desde **Lalax Systems**.

## Descripción

Este servidor MCP proporciona herramientas para:
- Extraer archivos de un directorio fuente a un directorio destino
- Listar archivos en un directorio con filtros por patrón
- Organizar archivos por extensión, fecha o tamaño

## Herramientas Disponibles

### 1. `extract_files`
Extrae archivos de un directorio fuente a un directorio destino.

**Parámetros:**
- `sourceDir` (string): Ruta del directorio fuente
- `targetDir` (string): Ruta del directorio destino
- `pattern` (string, opcional): Patrón de archivos a extraer (ej: `*.jpg`, `*.txt`)
- `recursive` (boolean, opcional): Buscar recursivamente en subdirectorios (default: `true`)
- `move` (boolean, opcional): Mover archivos en lugar de copiar (default: `false`)
- `conflictResolution` (string, opcional): Cómo manejar conflictos de nombres:
  - `"skip"`: Saltar archivos con nombres duplicados
  - `"overwrite"`: Sobrescribir archivos existentes
  - `"rename"`: Renombrar archivos con sufijo numérico (default)

**Ejemplo de uso:**
```json
{
  "sourceDir": "/ruta/fuente",
  "targetDir": "/ruta/destino",
  "pattern": "*.jpg",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

### 2. `list_files`
Lista archivos en un directorio con información detallada.

**Parámetros:**
- `directory` (string): Ruta del directorio a listar
- `pattern` (string, opcional): Patrón de archivos a listar (ej: `*.jpg`, `*.txt`)
- `recursive` (boolean, opcional): Listar recursivamente (default: `false`)

**Ejemplo de uso:**
```json
{
  "directory": "/ruta/directorio",
  "pattern": "*.txt",
  "recursive": true
}
```

### 3. `organize_files`
Organiza archivos por criterio específico.

**Parámetros:**
- `sourceDir` (string): Ruta del directorio fuente
- `targetDir` (string, opcional): Ruta del directorio destino (default: mismo directorio fuente)
- `organizeBy` (string, opcional): Criterio de organización:
  - `"extension"`: Organizar por extensión de archivo (default)
  - `"date"`: Organizar por fecha de modificación (año-mes)
  - `"size"`: Organizar por tamaño de archivo

**Ejemplo de uso:**
```json
{
  "sourceDir": "/ruta/fuente",
  "targetDir": "/ruta/destino",
  "organizeBy": "extension"
}
```

## Instalación

### Desde GitHub

```bash
# Clonar el repositorio
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

### Configuración en Kilo Code

Agregar al archivo de configuración MCP (`mcp_settings.json`):

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/ruta/al/proyecto/file-extractor-mcp/build/index.js"],
      "disabled": false,
      "alwaysAllow": [],
      "description": "MCP server para extraer archivos de directorios y moverlos a otro directorio"
    }
  }
}
```

### Instalación Global (opcional)

```bash
npm install -g @lalax-systems/file-extractor-mcp
```

El servidor se ejecuta automáticamente cuando se inicia Kilo Code.

## Estructura del Proyecto

```
file-extractor/
├── src/
│   └── index.ts          # Implementación principal del servidor
├── build/
│   └── index.js          # Código compilado
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración TypeScript
└── README.md            # Esta documentación
```

## Desarrollo

Para modificar el servidor:

1. Editar el archivo `src/index.ts`
2. Ejecutar `npm run build` para compilar
3. Reiniciar Kilo Code para cargar los cambios

## Ejemplos de Uso

### Extraer todas las imágenes JPG:
```bash
# Usando el tool extract_files
sourceDir: "/home/usuario/fotos"
targetDir: "/home/usuario/backup"
pattern: "*.jpg"
recursive: true
```

### Organizar documentos por extensión:
```bash
# Usando el tool organize_files
sourceDir: "/home/usuario/descargas"
organizeBy: "extension"
```

### Listar archivos PDF en un directorio:
```bash
# Usando el tool list_files
directory: "/home/usuario/documentos"
pattern: "*.pdf"
recursive: false
```

## Notas

- El servidor maneja automáticamente la creación de directorios destino
- Soporta operaciones recursivas en subdirectorios
- Proporciona resolución de conflictos de nombres
- Devuelve JSON estructurado con resultados detallados

## Acerca de

**Desarrollador**: Javier Gomez  
**Empresa**: Lalax Systems  
**Repositorio**: https://github.com/lalax-systems/file-extractor-mcp  
**Sitio web**: https://lalax.systems

Este proyecto es parte del ecosistema de herramientas MCP desarrolladas por Lalax Systems para mejorar la productividad y automatización en el desarrollo de software.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request en GitHub.

## Licencia

MIT License - Copyright (c) 2026 Javier Gomez - Lalax Systems
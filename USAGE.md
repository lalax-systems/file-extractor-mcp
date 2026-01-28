# Uso del File Extractor MCP Server

Esta guía explica cómo usar el File Extractor MCP Server en diferentes entornos.

## Configuración Rápida

### 1. Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/lalax-systems/file-extractor-mcp.git
cd file-extractor-mcp

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

### 2. Configuración en Kilo Code

Edita el archivo de configuración MCP (`mcp_settings.json`) y agrega:

```json
{
  "mcpServers": {
    "file-extractor": {
      "command": "node",
      "args": ["/ruta/completa/a/file-extractor-mcp/build/index.js"],
      "disabled": false,
      "alwaysAllow": [],
      "description": "MCP server para extraer archivos de directorios y moverlos a otro directorio"
    }
  }
}
```

### 3. Reiniciar Kilo Code

Reinicia Kilo Code para que cargue el nuevo servidor MCP.

## Ejemplos de Uso

### Ejemplo 1: Extraer todas las imágenes JPG

```bash
# Usando el tool extract_files
{
  "sourceDir": "/home/usuario/fotos",
  "targetDir": "/home/usuario/backup",
  "pattern": "*.jpg",
  "recursive": true,
  "move": false,
  "conflictResolution": "rename"
}
```

### Ejemplo 2: Organizar documentos por extensión

```bash
# Usando el tool organize_files
{
  "sourceDir": "/home/usuario/descargas",
  "organizeBy": "extension"
}
```

### Ejemplo 3: Listar archivos PDF en un directorio

```bash
# Usando el tool list_files
{
  "directory": "/home/usuario/documentos",
  "pattern": "*.pdf",
  "recursive": false
}
```

## Herramientas Disponibles

### 1. `extract_files`

Extrae archivos de un directorio fuente a un directorio destino.

**Parámetros:**
- `sourceDir`: Ruta del directorio fuente (requerido)
- `targetDir`: Ruta del directorio destino (requerido)
- `pattern`: Patrón de archivos (ej: `*.jpg`, `*.txt`) (opcional)
- `recursive`: Buscar en subdirectorios (default: `true`)
- `move`: Mover en lugar de copiar (default: `false`)
- `conflictResolution`: Manejo de conflictos (`skip`, `overwrite`, `rename`) (default: `rename`)

### 2. `list_files`

Lista archivos en un directorio con información detallada.

**Parámetros:**
- `directory`: Ruta del directorio (requerido)
- `pattern`: Patrón de archivos (opcional)
- `recursive`: Listar recursivamente (default: `false`)

### 3. `organize_files`

Organiza archivos por criterio específico.

**Parámetros:**
- `sourceDir`: Ruta del directorio fuente (requerido)
- `targetDir`: Ruta del directorio destino (opcional, default: mismo directorio)
- `organizeBy`: Criterio (`extension`, `date`, `size`) (default: `extension`)

## Casos de Uso Comunes

### 1. Backup de Fotos

```bash
# Copiar todas las fotos a un directorio de backup
extract_files({
  sourceDir: "/home/usuario/fotos",
  targetDir: "/backup/fotos",
  pattern: "*.{jpg,png,gif}",
  recursive: true,
  move: false,
  conflictResolution: "rename"
})
```

### 2. Organizar Descargas

```bash
# Organizar archivos descargados por tipo
organize_files({
  sourceDir: "/home/usuario/descargas",
  organizeBy: "extension"
})
```

### 3. Limpieza de Temporales

```bash
# Mover archivos temporales antiguos
extract_files({
  sourceDir: "/tmp",
  targetDir: "/home/usuario/temp_backup",
  pattern: "*.tmp",
  recursive: true,
  move: true,
  conflictResolution: "overwrite"
})
```

## Solución de Problemas

### Error: "El directorio no existe"
- Verifica que la ruta sea correcta
- Asegúrate de que el directorio exista
- Verifica los permisos de lectura/escritura

### Error: "Permiso denegado"
- Ejecuta con permisos adecuados
- Verifica los permisos del directorio
- Considera usar `sudo` si es necesario

### El servidor no se inicia
- Verifica que Node.js esté instalado (versión 18+)
- Revisa que todas las dependencias estén instaladas
- Verifica la ruta en la configuración MCP

## Mejores Prácticas

1. **Siempre haz backup** antes de usar `move: true`
2. **Prueba con `recursive: false`** primero para ver los resultados
3. **Usa `conflictResolution: "rename"`** para evitar sobrescribir archivos importantes
4. **Verifica los patrones** con `list_files` antes de extraer

## Soporte

Para problemas o preguntas:
- Abre un issue en GitHub: https://github.com/lalax-systems/file-extractor-mcp/issues
- Contacta al desarrollador: info@lalax.com

## Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request
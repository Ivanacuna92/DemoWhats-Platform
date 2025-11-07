# Paleta de Colores - AloIADemo

## Esquema de Colores Principal

La plataforma utiliza una paleta basada en tonalidades moradas/fucsia elegantes:

### Colores Primarios

| Color | Código | Uso |
|-------|--------|-----|
| **Primary** | `#ae3a8d` | Color principal de la marca - Botones, enlaces, highlights |
| **Primary Dark** | `#8b2e70` | Hover states, énfasis |
| **Primary Medium** | `#c557a4` | Elementos secundarios activos |
| **Primary Light** | `#d97ec4` | Backgrounds suaves, highlights ligeros |

### Colores Secundarios

| Color | Código | Uso |
|-------|--------|-----|
| **Secondary 1** | `#e8a5d8` | Borders, separadores suaves |
| **Secondary 2** | `#f2d4eb` | Backgrounds muy suaves, cajas informativas |
| **Secondary 3** | `#9b3380` | Acentos intensos |
| **Secondary 4** | `#732560` | Texto sobre fondos claros, contraste alto |

## Uso en Tailwind CSS

Los colores están disponibles como clases de Tailwind:

```jsx
// Backgrounds
className="bg-navetec-primary"
className="bg-navetec-primary-dark"
className="bg-navetec-secondary-2"

// Text
className="text-navetec-primary"
className="text-navetec-secondary-4"

// Borders
className="border-navetec-primary"
className="border-navetec-secondary-1"

// Hover
className="hover:bg-navetec-primary-dark"
```

## Ejemplos de Combinaciones

### Botones Primarios
- Background: `bg-navetec-primary`
- Hover: `hover:bg-navetec-primary-dark`
- Text: `text-white`

### Cajas Informativas
- Background: `bg-navetec-secondary-2`
- Border: `border-navetec-secondary-1`
- Text: `text-navetec-secondary-4`

### Headers/Títulos
- Text: `text-navetec-primary`
- Font: `font-bold`

## Colores de Sistema (Mantienen Tailwind Default)

- **Success**: `green-500` (para estados exitosos/conectados)
- **Error**: `red-500`/`red-600` (para errores y alertas)
- **Warning**: `yellow-500` (para advertencias)
- **Info**: Colores secundarios de navetec

## Vista Previa de Colores

### Primarios
🟣 `#ae3a8d` - Primary
🟣 `#8b2e70` - Primary Dark
🟪 `#c557a4` - Primary Medium
💜 `#d97ec4` - Primary Light

### Secundarios
💗 `#e8a5d8` - Secondary 1
🌸 `#f2d4eb` - Secondary 2
🟣 `#9b3380` - Secondary 3
🟣 `#732560` - Secondary 4

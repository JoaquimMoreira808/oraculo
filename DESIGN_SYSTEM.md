# Design System - Invent

## Tipografia

### Fontes

- **Título Principal (Logo)**: Roboto Slab, Semi-bold (600), 36px
- **Corpo/Sistema**: Arimo, Regular (400-700)
- **Monospace**: Roboto Mono / Source Code Pro

### Importação de Fontes

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400..700;1,400..700&family=Bubbler+One&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Slab:wght@100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Zalando+Sans+SemiExpanded:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
```

## Paleta de Cores

### Cores Principais

- **Header Background**: `#183054`
- **Background Principal**: `#f2f1e4`
- **Grid Lines**: `rgba(230, 228, 215, 0.3)` - 3px

### Cores de Texto

- **Texto Header**: `#ffffff` (branco)
- **Texto Principal**: `#333333`
- **Texto Secundário**: `#666666`

### Cores de Interação

- **Button Background**: `rgba(255, 255, 255, 0.15)`
- **Button Hover**: `rgba(255, 255, 255, 0.25)`
- **User Button Background**: `rgba(255, 255, 255, 0.1)`
- **User Button Hover**: `rgba(255, 255, 255, 0.2)`
- **Dropdown Hover**: `#f5f5f5`
- **Danger Color**: `#f54257` (vermelho padrão da aplicação)

## Componentes

### TopBar

- **Altura**: 90px
- **Padding Horizontal**: 20px
- **Background**: `#183054`
- **Efeitos**: `backdrop-filter: blur(10px)`

### Botões de Navegação

- **Padding**: 10px 20px
- **Border Radius**: 6px
- **Font Size**: 15px
- **Gap entre botões**: 12px
- **Transição**: `background-color 0.2s, transform 0.1s`
- **Active State**: `transform: scale(0.95)`

### Botão de Usuário

- **Padding**: 8px
- **Border Radius**: 6px
- **Icon Size**: 20x20px

### Dropdown

- **Min Width**: 160px
- **Border Radius**: 6px
- **Box Shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Margin Top**: 8px
- **Item Padding**: 12px 16px
- **Item Font Size**: 14px
- **Transição**: `all 0.2s ease`

## Background Pattern

- **Tipo**: Grid quadriculado
- **Tamanho dos quadrados**: 60x60px
- **Espessura das linhas**: 3px
- **Cor das linhas**: `rgba(230, 228, 215, 0.3)`

## Animações e Transições

### Conteúdo de Página
- **Entrada**: Fade in + scale up (0.97 → 1.0) em 0.4s ease-out

### Botões
- **Hover**: Mudança de background em 0.2s
- **Click**: Scale down para 0.95 em 0.1s

### Dropdown
- **Abertura**: Fade in + translateY em 0.2s ease
- **Fechamento**: Fade out + translateY em 0.2s ease

## Espaçamento

- **Header Height**: 90px
- **Content Padding**: 40px 20px
- **Max Width Content**: 1200px
- **Button Gap**: 12px
- **Dropdown Margin**: 8px

## Border Radius

- **Padrão**: 6px (botões, dropdown, user button)

## Sombras

- **Dropdown**: `0 4px 12px rgba(0, 0, 0, 0.15)`

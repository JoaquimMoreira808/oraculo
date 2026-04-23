# Design System - Invent
## Modern Dark Theme

> Sistema de design moderno inspirado em n8n e AbacatePay com tema dark elegante

## 🎨 Paleta de Cores

### Cores de Fundo
```css
--bg-primary: #0a0a0a;      /* Fundo principal */
--bg-secondary: #111111;    /* Fundo secundário */
--bg-tertiary: #1a1a1a;     /* Fundo terciário */
--bg-elevated: #1f1f1f;     /* Elementos elevados */
--bg-hover: #252525;        /* Estado hover */
--bg-card: #161616;         /* Cards e containers */
--bg-input: #1a1a1a;        /* Campos de entrada */
--bg-modal: #141414;        /* Modais */
```

### Cores de Texto
```css
--text-primary: #ffffff;    /* Texto principal */
--text-secondary: #e5e5e5;  /* Texto secundário */
--text-muted: #a3a3a3;      /* Texto esmaecido */
--text-disabled: #737373;   /* Texto desabilitado */
--text-placeholder: #666666; /* Placeholders */
```

### Cores de Destaque

#### Azul (Ações Principais)
```css
--accent-primary: #3b82f6;  /* Azul principal */
--accent-hover: #2563eb;    /* Azul hover */
--accent-light: #60a5fa;    /* Azul claro */
--accent-dark: #1d4ed8;     /* Azul escuro */
--accent-bg: rgba(59, 130, 246, 0.1); /* Fundo azul */
--accent-border: rgba(59, 130, 246, 0.2); /* Borda azul */
```

#### Prateado/Silver (Elementos Elegantes)
```css
--silver-primary: #c0c0c0;  /* Prata principal */
--silver-light: #e8e8e8;    /* Prata claro */
--silver-dark: #a8a8a8;     /* Prata escuro */
--silver-muted: #909090;    /* Prata esmaecido */
```

### Cores de Status
```css
--success: #22c55e;         /* Verde sucesso */
--success-bg: rgba(34, 197, 94, 0.1);
--warning: #f59e0b;         /* Amarelo aviso */
--warning-bg: rgba(245, 158, 11, 0.1);
--error: #ef4444;           /* Vermelho erro */
--error-bg: rgba(239, 68, 68, 0.1);
--info: #06b6d4;            /* Ciano informação */
--info-bg: rgba(6, 182, 212, 0.1);
```

### Bordas
```css
--border-primary: #2a2a2a;  /* Borda principal */
--border-secondary: #333333; /* Borda secundária */
--border-focus: var(--accent-primary); /* Borda foco */
--border-hover: #404040;    /* Borda hover */
--border-silver: var(--silver-muted); /* Borda prata */
```

## 🌟 Sombras e Efeitos

### Sombras
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.6);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.7);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.8);
--shadow-glow: 0 0 20px rgba(59, 130, 246, 0.15);
--shadow-silver: 0 0 20px rgba(192, 192, 192, 0.1);
```

### Gradientes
```css
--gradient-primary: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-dark) 100%);
--gradient-card: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%);
--gradient-hover: linear-gradient(135deg, var(--bg-hover) 0%, var(--bg-elevated) 100%);
--gradient-silver: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
--gradient-silver-dark: linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%);
```

## 📝 Tipografia

### Fonte Principal
- **Família**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
- **Características**: font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'
- **Suavização**: -webkit-font-smoothing: antialiased

### Hierarquia de Texto
- **Títulos Principais**: 32-48px, font-weight: 700, gradiente prateado
- **Títulos Seção**: 24-28px, font-weight: 600
- **Texto Corpo**: 14-16px, font-weight: 400-500
- **Texto Pequeno**: 12-13px, font-weight: 400

### Importação de Fonte
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 📐 Espaçamento

### Sistema de Espaçamento
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
```

### Border Radius
```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
```

## ⚡ Animações e Transições

### Curvas de Transição
```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### Animações Principais
```css
@keyframes tableEnter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
  }
}
```

## 🧩 Componentes

### TopBar
- **Altura**: 72px
- **Background**: var(--bg-card)
- **Borda**: 1px solid var(--border-primary)
- **Efeitos**: backdrop-filter: blur(20px), box-shadow: var(--shadow-sm)
- **Posição**: sticky, top: 0

### Botões

#### Botão Primário
```css
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}
```

#### Botões de Ação
- **Tamanho**: 32x32px
- **Border Radius**: var(--radius-md)
- **Background**: var(--bg-elevated)
- **Border**: 1px solid var(--border-primary)
- **Hover**: translateY(-1px) + box-shadow

### Cards e Containers
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
}
```

### Modais
```css
.modal {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
}

.modal-content {
  background: var(--bg-modal);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}
```

### Formulários
```css
.form-input {
  background: var(--bg-input);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  padding: var(--space-sm) var(--space-md);
}

.form-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-bg);
  background: var(--bg-elevated);
}

/* Autocomplete styling - Remove fundo azul padrão */
.form-input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--bg-input) inset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  border-color: var(--border-primary) !important;
  background-color: var(--bg-input) !important;
  transition: background-color 5000s ease-in-out 0s;
}

.form-input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--bg-elevated) inset !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 3px var(--accent-bg) !important;
}
```

### Tabelas
```css
.table-container {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
}

.table thead {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-primary);
}

.table tbody tr:hover {
  background: var(--bg-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## 🎯 Uso de Cores por Contexto

### Títulos e Logos
- **Cor**: Gradiente prateado (--gradient-silver-dark)
- **Efeito**: text-shadow com brilho sutil

### Navegação e Hovers
- **Cor**: Prateado (--silver-light)
- **Sombra**: --shadow-silver
- **Borda**: --silver-muted

### Ações Principais
- **Cor**: Azul (--accent-primary)
- **Gradiente**: --gradient-primary
- **Sombra**: --shadow-glow

### Estados de Erro
- **Cor**: --error
- **Background**: --error-bg
- **Sombra**: Vermelha personalizada

## 📱 Responsividade

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  .topbar {
    padding: 0 var(--space-md);
    height: 64px;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  /* Ajustes para tablet */
}

/* Desktop */
@media (min-width: 1200px) {
  /* Ajustes para desktop */
}
```

## 🖱️ Sistema de Scrollbars Personalizadas

### Tipos de Scrollbar

#### Scrollbar Padrão (Global)
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--border-secondary);
  border-radius: 4px;
  transition: all var(--transition-fast);
  border: 1px solid var(--bg-secondary);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
```

#### Scrollbar para Modais
```css
.modal-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.modal-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 2px;
}

.modal-scrollbar::-webkit-scrollbar-thumb {
  background: var(--text-disabled);
  border-radius: 2px;
  transition: all var(--transition-fast);
  opacity: 0.6;
}

.modal-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
  opacity: 1;
}
```

#### Scrollbar para Tabelas
```css
.table-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.table-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-card);
  border-radius: 3px;
}

.table-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-secondary);
  border-radius: 3px;
  transition: all var(--transition-fast);
}

.table-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--silver-muted);
}
```

#### Scrollbar Customizada (Interativa)
```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-elevated);
  border-radius: 3px;
  margin: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 3px;
  transition: all var(--transition-fast);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
}
```

### Suporte ao Firefox
```css
/* Scrollbar padrão */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--border-secondary) var(--bg-secondary);
}

/* Scrollbar customizada */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--border-primary) var(--bg-elevated);
}

/* Scrollbar para modais */
.modal-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--text-disabled) transparent;
}
```

### Componente Scrollbar

#### Uso Básico
```astro
---
import Scrollbar from '../components/Scrollbar.astro';
---

<Scrollbar type="modal">
  <div>Conteúdo com scroll...</div>
</Scrollbar>
```

#### Tipos Disponíveis
- `default`: Scrollbar padrão do sistema
- `modal`: Scrollbar discreta para modais
- `table`: Scrollbar para tabelas e listas
- `custom`: Scrollbar interativa com efeitos

#### Props do Componente
```typescript
interface Props {
  type?: 'default' | 'modal' | 'table' | 'custom';
  className?: string;
}
```

### Funcionalidades Avançadas

#### Scroll Horizontal com Shift + Wheel
```javascript
container.addEventListener('wheel', (e) => {
  if (e.shiftKey) {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  }
});
```

#### Detecção Automática de Scroll
```javascript
const hasVerticalScroll = container.scrollHeight > container.clientHeight;
const hasHorizontalScroll = container.scrollWidth > container.clientWidth;

if (hasVerticalScroll) {
  container.classList.add('has-vertical-scroll');
}
```

### Aplicação no Sistema

#### Modais
- Scrollbar discreta (4px)
- Fundo transparente
- Thumb com opacidade reduzida
- Hover com destaque sutil

#### Tabelas
- Scrollbar média (6px)
- Suporte horizontal e vertical
- Corner styling para intersecções
- Hover com cor prateada

#### Resultados de Busca
- Scrollbar customizada (6px)
- Efeito glow no hover
- Cor de destaque azul
- Transições suaves

#### Containers Gerais
- Scrollbar padrão (8px)
- Borda sutil no thumb
- Cores consistentes com o tema
- Transições rápidas

### Melhores Práticas

1. **Consistência**: Use o tipo apropriado para cada contexto
2. **Acessibilidade**: Mantenha contraste adequado
3. **Performance**: Evite animações complexas em scrollbars
4. **Responsividade**: Ajuste tamanhos para dispositivos móveis
5. **Fallback**: Sempre inclua suporte ao Firefox

### Customização Avançada

```css
/* Scrollbar com gradiente */
.gradient-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, var(--accent-primary), var(--accent-light));
}

/* Scrollbar com animação */
.animated-scrollbar::-webkit-scrollbar-thumb:hover {
  animation: scrollGlow 0.3s ease;
}

@keyframes scrollGlow {
  0% { box-shadow: none; }
  50% { box-shadow: 0 0 10px var(--accent-primary); }
  100% { box-shadow: 0 0 6px rgba(59, 130, 246, 0.3); }
}
```

## 🎨 Seleção de Texto

```css
::selection {
  background: var(--accent-bg);
  color: var(--accent-light);
}
```

## 🔄 Autocomplete e Preenchimento Automático

### Problema do Fundo Azul
Por padrão, os navegadores aplicam um fundo azul claro nos campos preenchidos automaticamente. Para manter a consistência visual do tema dark, removemos esse comportamento.

### Solução Global
```css
/* Aplicado globalmente no Layout.astro */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
select:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px var(--bg-input) inset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
  border-color: var(--border-primary) !important;
  background-color: var(--bg-input) !important;
  color: var(--text-primary) !important;
  transition: background-color 5000s ease-in-out 0s;
}
```

### Estados de Foco com Autocomplete
```css
input:-webkit-autofill:focus,
textarea:-webkit-autofill:focus,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--bg-elevated) inset !important;
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 3px var(--accent-bg) !important;
}
```

### Explicação Técnica

#### `-webkit-box-shadow: 0 0 0 1000px var(--bg-input) inset`
- Cria uma sombra interna muito grande que sobrescreve o fundo azul
- O valor `1000px` garante que cubra todo o campo
- `inset` faz a sombra ficar dentro do elemento

#### `transition: background-color 5000s ease-in-out 0s`
- Atrasa a transição do background por 5000 segundos
- Efetivamente "congela" a cor de fundo atual
- Previne que o navegador mude a cor automaticamente

#### `-webkit-text-fill-color: var(--text-primary) !important`
- Força a cor do texto a permanecer consistente
- Sobrescreve a cor padrão do autocomplete
- Usa `!important` para garantir prioridade

### Aplicação nos Componentes

Todos os componentes de formulário incluem esses estilos:
- `Modal.astro`
- `SelectField.astro`
- `TextAreaField.astro`
- `FormField.astro` (via Modal)

### Teste de Compatibilidade

#### Navegadores Suportados
- ✅ Chrome/Chromium
- ✅ Safari
- ✅ Edge
- ⚠️ Firefox (usa diferentes propriedades)

#### Fallback para Firefox
```css
/* Firefox não suporta -webkit-autofill */
@-moz-document url-prefix() {
  input[autocomplete],
  textarea[autocomplete],
  select[autocomplete] {
    background-color: var(--bg-input) !important;
    color: var(--text-primary) !important;
  }
}
```

### Melhores Práticas

1. **Sempre incluir**: Adicione os estilos de autocomplete em todos os formulários
2. **Testar estados**: Verifique tanto o estado normal quanto o de foco
3. **Consistência**: Use as mesmas cores do sistema de design
4. **Acessibilidade**: Mantenha contraste adequado mesmo com autocomplete
5. **Performance**: Use `!important` apenas quando necessário

## ♿ Acessibilidade

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Contraste
- Todos os textos seguem WCAG 2.1 AA
- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande

## 🚀 Implementação no Astro

### CSS Scoped vs Global
```astro
<!-- ✅ Para elementos estáticos -->
<style>
  .static-element { color: var(--text-primary); }
</style>

<!-- ✅ Para elementos dinâmicos -->
<style>
  :global(.dynamic-element) { color: var(--text-primary); }
</style>
```

### Variáveis CSS
Todas as variáveis estão definidas em `:root` no Layout.astro e podem ser usadas em qualquer componente:

```css
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: all var(--transition-fast);
}
```

---

> **Nota**: Este design system foi criado para proporcionar uma experiência moderna, elegante e profissional, mantendo a funcionalidade e acessibilidade como prioridades.

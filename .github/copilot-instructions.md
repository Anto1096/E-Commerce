# Copilot Instructions - E-Commerce Frontend con IA

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexto del Proyecto
Este es un proyecto de E-Commerce frontend desarrollado con React + TypeScript y Vite, enfocado en integrar funcionalidades de Inteligencia Artificial.

## Tecnologías Principales
- **React 18** con TypeScript
- **Vite** como build tool
- **CSS Modules** o **Styled Components** para estilos
- **Axios** para peticiones HTTP
- **React Router** para navegación
- **Context API** para gestión de estado

## Funcionalidades de IA a Implementar
1. **Generador de Descripciones de Productos**: Crear prompts para generar descripciones atractivas usando APIs de IA
2. **Chatbot de Atención**: Sistema de chat inteligente para resolver dudas de clientes
3. **Sistema de Recomendaciones**: Algoritmos para sugerir productos basados en preferencias
4. **Búsqueda Inteligente**: Búsqueda semántica de productos
5. **Análisis de Sentimientos**: Para reseñas de productos

## Estructura de Componentes Recomendada
```
src/
  components/
    common/          # Componentes reutilizables
    products/        # Componentes relacionados con productos
    cart/           # Carrito de compras
    ai/             # Componentes con funcionalidades de IA
  services/
    api/            # Servicios de API
    ai/             # Servicios de IA (prompts, integraciones)
  hooks/            # Custom hooks
  context/          # Context providers
  types/            # TypeScript interfaces
  utils/            # Utilidades
```

## Guidelines de Código
- Usar TypeScript interfaces para tipado fuerte
- Componentes funcionales con hooks
- Implementar error boundaries
- Código limpio y bien documentado
- Testing unitario con Jest/Vitest
- Responsive design mobile-first

## Prompts Engineering Guidelines
- Crear prompts claros y específicos
- Incluir contexto del negocio en los prompts
- Manejar respuestas de IA con validación
- Implementar fallbacks para cuando las APIs fallen
- Optimizar prompts para reducir tokens/costos

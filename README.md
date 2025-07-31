# 🛍️ TechStore Pro - E-Commerce con IA

Una plataforma de e-commerce moderna desarrollada con React + TypeScript que integra funcionalidades avanzadas de **Inteligencia Artificial** y **Prompt Engineering**.

## 🚀 Características Principales

### 🤖 **Funcionalidades de IA**
- **Generador de Descripciones**: IA crea descripciones de productos optimizadas y persuasivas
- **Chatbot Inteligente**: Asistente virtual 24/7 para atención al cliente
- **Recomendaciones Personalizadas**: Sistema de recomendaciones basado en IA
- **Búsqueda Semántica**: Búsqueda inteligente que entiende intenciones
- **Análisis de Sentimientos**: Evaluación automática de reseñas de productos

### 💻 **Stack Tecnológico**
- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: CSS Modules con diseño responsive
- **IA/API**: Integración con OpenAI/Claude (configurable)
- **Estado**: React Context API
- **Build Tool**: Vite (desarrollo rápido)

### 🎯 **Ingeniería de Prompts**
- Templates de prompts optimizados para e-commerce
- Prompts especializados por caso de uso
- Sistema de fallbacks inteligentes
- Configuración de parámetros por contexto

## 📦 Instalación y Configuración

### 1. **Instalar Dependencias**
```bash
npm install
```

### 2. **Configurar Variables de Entorno**
Copia el archivo `.env` y configura tu API de IA:

```env
# Para OpenAI
VITE_AI_API_URL=https://api.openai.com/v1
VITE_AI_API_KEY=tu-openai-api-key

# Para Claude (Anthropic)
VITE_AI_API_URL=https://api.anthropic.com/v1  
VITE_AI_API_KEY=tu-claude-api-key
```

### 3. **Ejecutar en Desarrollo**
```bash
npm run dev
```

### 4. **Build para Producción**
```bash
npm run build
npm run preview
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   ├── products/        # Catálogo y productos
│   │   ├── ProductCatalog.tsx
│   │   └── ProductCatalog.css
│   └── ai/              # Componentes con IA
│       ├── AIChat.tsx
│       └── AIChat.css
├── services/
│   └── ai/              # Servicios de IA
│       └── aiService.ts # Templates de prompts y lógica
├── types/               # Definiciones TypeScript
│   └── index.ts
├── App.tsx              # Componente principal
└── App.css              # Estilos globales
```

## 🤖 Sistema de Prompts Engineering

### **Templates de Prompts Incluidos**

#### 1. **Generación de Descripciones de Productos**
```typescript
const productDescriptionPrompt = `
Eres un experto copywriter de e-commerce. Crea una descripción persuasiva para:

Producto: {productName}
Categoría: {category}  
Características: {features}
Precio: {price}

Requisitos:
- 100-150 palabras
- Lenguaje persuasivo pero honesto
- Enfoque en beneficios
- SEO optimizado
- Llamada a la acción
`;
```

#### 2. **Chatbot de Atención al Cliente**
```typescript
const chatbotPrompt = `
Eres un asistente virtual profesional para TechStore Pro.

Usuario dice: "{userMessage}"
Contexto: {context}

Responde de manera:
- Amable y profesional
- Concisa pero completa  
- Sugiere productos relevantes
- Ofrece contacto humano si es necesario
`;
```

#### 3. **Sistema de Recomendaciones**
```typescript
const recommendationsPrompt = `
Genera 5 recomendaciones personalizadas basadas en:

- Productos vistos: {viewedProducts}
- Categorías preferidas: {preferredCategories}
- Rango de precio: {priceRange}
- Historial de compras: {purchaseHistory}

Explica por qué recomiendas cada producto.
`;
```

## 🎨 Funcionalidades de la Interfaz

### **Catálogo de Productos**
- ✅ Grid responsive con productos
- ✅ Filtros por categoría y precio
- ✅ Generación de descripciones con IA
- ✅ Sistema de recomendaciones
- ✅ Etiquetas de descuentos
- ✅ Estado de stock en tiempo real

### **Chatbot Inteligente**
- ✅ Interfaz de chat moderna
- ✅ Preguntas frecuentes integradas
- ✅ Indicador de escritura
- ✅ Respuestas contextuales
- ✅ Botón flotante para acceso rápido

### **Búsqueda Avanzada**
- ✅ Búsqueda en tiempo real
- ✅ Filtros múltiples
- ✅ Sugerencias inteligentes
- ✅ Resultados semánticos

## 🔧 Personalización y Extensión

### **Agregar Nuevos Prompts**
```typescript
// En src/services/ai/aiService.ts
const nuevoPrompt: AIPromptTemplate = {
  id: 'nuevo_caso_uso',
  name: 'Nuevo Caso de Uso',
  category: 'custom',
  template: `Tu prompt aquí con {variables}`,
  variables: ['variable1', 'variable2'],
  examples: ['Ejemplo de uso']
};
```

### **Integrar Nueva API de IA**
```typescript
// Modificar el método callAIAPI en aiService.ts
private async callAIAPI(prompt: string): Promise<string> {
  const response = await fetch(this.baseURL + '/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

## 📊 Mejores Prácticas Implementadas

### **Prompt Engineering**
- ✅ Prompts específicos y contextuales
- ✅ Variables dinámicas en templates
- ✅ Ejemplos y casos de uso incluidos
- ✅ Fallbacks para errores de API
- ✅ Optimización de tokens y costos

### **Desarrollo**
- ✅ TypeScript para type safety
- ✅ Componentes modulares y reutilizables
- ✅ CSS responsive mobile-first
- ✅ Manejo de errores robusto
- ✅ Performance optimizado

### **UX/UI**
- ✅ Interfaz intuitiva y moderna
- ✅ Feedback visual para operaciones de IA
- ✅ Carga progresiva de contenido
- ✅ Accesibilidad web
- ✅ Animaciones fluidas

## 🚀 Despliegue

### **Vercel**
```bash
npm run build
npx vercel --prod
```

### **Netlify** 
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔮 Próximas Funcionalidades

- [ ] **Sistema de Inventario Inteligente**: Predicción de demanda con IA
- [ ] **Personalización Visual**: Generación de imágenes de productos
- [ ] **Análisis de Comportamiento**: Dashboard con insights de usuarios  
- [ ] **Chatbot Multiidioma**: Soporte para múltiples idiomas
- [ ] **Realidad Aumentada**: Vista previa de productos en AR
- [ ] **Integración con Pagos**: Stripe, PayPal, criptomonedas

## 📝 Notas del Ingeniero de Prompts

Este proyecto ha sido diseñado como una demostración completa de cómo integrar **Inteligencia Artificial** en una aplicación web moderna usando **técnicas avanzadas de Prompt Engineering**.

### **Puntos Clave:**
1. **Prompts Optimizados**: Cada template está diseñado para casos de uso específicos
2. **Escalabilidad**: Arquitectura preparada para añadir nuevas funcionalidades de IA
3. **Experiencia de Usuario**: IA como mejora, no obstáculo
4. **Costos Controlados**: Optimización de tokens y llamadas a API

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Ingeniero de Prompts Especializado**
- Experto en integración de IA en aplicaciones web
- Especialista en Prompt Engineering y optimización
- Desarrollador Full Stack con enfoque en tecnologías emergentes

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

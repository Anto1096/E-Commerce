// Servicio de IA con Prompts Engineering para E-Commerce
import type { Product, AIPromptTemplate, AIRecommendation } from '../../types';

// Configuración de la API (puedes cambiar por OpenAI, Claude, etc.)
const AI_API_BASE_URL = process.env.VITE_AI_API_URL || 'https://api.openai.com/v1';
const AI_API_KEY = process.env.VITE_AI_API_KEY || '';

// Templates de prompts optimizados para E-Commerce
export const PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'product_description_detailed',
    name: 'Descripción Detallada de Producto',
    category: 'product_description',
    template: `Eres un experto copywriter de e-commerce. Crea una descripción de producto persuasiva y profesional para:

Producto: {productName}
Categoría: {category}
Características principales: {features}
Precio: {price}
Público objetivo: {targetAudience}

Requisitos:
- Descripción de 100-150 palabras
- Lenguaje persuasivo pero honesto
- Enfócate en beneficios, no solo características
- Incluye llamada a la acción sutil
- Optimizado para SEO con palabras clave naturales
- Tono profesional pero accesible

Formato de respuesta:
[Título atractivo]
[Descripción del producto]
[Beneficios clave en bullet points]
[Llamada a la acción]`,
    variables: ['productName', 'category', 'features', 'price', 'targetAudience'],
    examples: [
      'Smartphone de última generación con cámara profesional'
    ]
  },
  {
    id: 'chatbot_customer_service',
    name: 'Chatbot Atención al Cliente',
    category: 'chatbot',
    template: `Eres un asistente virtual de atención al cliente para una tienda e-commerce llamada "TechStore Pro". 
Eres amable, profesional y siempre buscas ayudar al cliente.

Usuario dice: "{userMessage}"
Contexto: {context}
Productos relacionados: {relatedProducts}

Responde de manera:
- Amable y profesional
- Concisa pero completa
- Si no sabes algo, ofrece contactar con un humano
- Sugiere productos cuando sea relevante
- Usa emojis apropiados (máximo 2 por mensaje)

Si el usuario pregunta por:
- Productos: Proporciona información y sugerencias
- Envíos: Explica políticas de envío
- Devoluciones: Explica proceso de devolución
- Pagos: Menciona métodos aceptados
- Técnico: Ofrece soporte especializado`,
    variables: ['userMessage', 'context', 'relatedProducts']
  },
  {
    id: 'product_recommendations',
    name: 'Recomendaciones de Productos',
    category: 'recommendation',
    template: `Eres un sistema de recomendaciones inteligente para e-commerce.

Información del usuario:
- Productos vistos: {viewedProducts}
- Productos en carrito: {cartProducts}
- Categorías preferidas: {preferredCategories}
- Rango de precio: {priceRange}
- Compras anteriores: {purchaseHistory}

Catálogo disponible: {availableProducts}

Genera 5 recomendaciones personalizadas explicando:
1. Por qué recomiendas cada producto
2. Puntuación de relevancia (1-10)
3. Tipo de recomendación (similar, complementario, trending)

Criterios:
- Considera preferencias del usuario
- Incluye productos complementarios
- Varía precios y categorías
- Productos populares si no hay suficiente data`,
    variables: ['viewedProducts', 'cartProducts', 'preferredCategories', 'priceRange', 'purchaseHistory', 'availableProducts']
  }
];

class AIService {
  private apiKey: string;

  constructor() {
    this.apiKey = AI_API_KEY;
  }

  // Generar descripción de producto usando IA
  async generateProductDescription(product: Partial<Product>): Promise<string> {
    const template = PROMPT_TEMPLATES.find(t => t.id === 'product_description_detailed');
    if (!template) throw new Error('Template not found');

    const prompt = this.buildPrompt(template.template, {
      productName: product.name || 'Producto sin nombre',
      category: product.category || 'General',
      features: product.tags?.join(', ') || 'Características no especificadas',
      price: product.price?.toString() || 'Precio a consultar',
      targetAudience: 'Consumidores generales'
    });

    try {
      // Simulación de llamada a API (reemplaza con tu API real)
      const response = await this.callAIAPI(prompt);
      return response;
    } catch (error) {
      console.error('Error generating product description:', error);
      return this.getFallbackDescription(product);
    }
  }

  // Chatbot para atención al cliente
  async processChatMessage(message: string, context: any = {}): Promise<string> {
    const template = PROMPT_TEMPLATES.find(t => t.id === 'chatbot_customer_service');
    if (!template) throw new Error('Chatbot template not found');

    const prompt = this.buildPrompt(template.template, {
      userMessage: message,
      context: JSON.stringify(context),
      relatedProducts: context.relatedProducts || 'Ninguno'
    });

    try {
      const response = await this.callAIAPI(prompt);
      return response;
    } catch (error) {
      console.error('Error processing chat message:', error);
      return "Lo siento, hay un problema técnico. ¿Puedo ayudarte con algo más o prefieres contactar con un representante? 😊";
    }
  }

  // Generar recomendaciones personalizadas
  async generateRecommendations(userProfile: any, products: Product[]): Promise<AIRecommendation[]> {
    const template = PROMPT_TEMPLATES.find(t => t.id === 'product_recommendations');
    if (!template) throw new Error('Recommendations template not found');

    const prompt = this.buildPrompt(template.template, {
      viewedProducts: userProfile.viewedProducts?.join(', ') || 'Ninguno',
      cartProducts: userProfile.cartProducts?.join(', ') || 'Ninguno',
      preferredCategories: userProfile.preferredCategories?.join(', ') || 'Todas',
      priceRange: `${userProfile.priceRange?.min || 0} - ${userProfile.priceRange?.max || 'Sin límite'}`,
      purchaseHistory: userProfile.purchaseHistory?.join(', ') || 'Sin historial',
      availableProducts: products.slice(0, 20).map(p => `${p.name} - $${p.price}`).join(', ')
    });

    try {
      const response = await this.callAIAPI(prompt);
      return this.parseRecommendations(response, products);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return this.getFallbackRecommendations(products);
    }
  }

  // Búsqueda semántica mejorada
  async enhanceSearch(query: string, products: Product[]): Promise<{
    enhancedQuery: string;
    suggestions: string[];
    semanticMatches: Product[];
  }> {
    const prompt = `
    Eres un experto en búsqueda semántica para e-commerce.
    
    Consulta del usuario: "${query}"
    
    Productos disponibles: ${products.slice(0, 10).map(p => p.name).join(', ')}
    
    Tareas:
    1. Mejora la consulta con sinónimos y términos relacionados
    2. Sugiere 3 búsquedas alternativas
    3. Identifica productos que podrían coincidir semánticamente
    
    Responde en JSON:
    {
      "enhancedQuery": "consulta mejorada",
      "suggestions": ["sugerencia1", "sugerencia2", "sugerencia3"],
      "matchingProducts": ["producto1", "producto2"]
    }
    `;

    try {
      const response = await this.callAIAPI(prompt);
      const parsed = JSON.parse(response);
      
      const semanticMatches = products.filter(p => 
        parsed.matchingProducts.some((match: string) => 
          p.name.toLowerCase().includes(match.toLowerCase())
        )
      );

      return {
        enhancedQuery: parsed.enhancedQuery,
        suggestions: parsed.suggestions,
        semanticMatches
      };
    } catch (error) {
      console.error('Error enhancing search:', error);
      return {
        enhancedQuery: query,
        suggestions: [],
        semanticMatches: []
      };
    }
  }

  // Métodos privados de utilidad
  private buildPrompt(template: string, variables: Record<string, string>): string {
    let prompt = template;
    Object.entries(variables).forEach(([key, value]) => {
      prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), value);
    });
    return prompt;
  }

  private async callAIAPI(prompt: string): Promise<string> {
    // Implementación mock - reemplaza con tu API real
    if (!this.apiKey) {
      throw new Error('AI API key not configured');
    }

    // Simulación de respuesta para desarrollo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (prompt.includes('producto')) {
      return `Descubre este increíble producto que transformará tu experiencia. 
      Con tecnología de vanguardia y diseño elegante, ofrece:
      • Calidad superior garantizada
      • Fácil de usar y mantener  
      • Excelente relación calidad-precio
      ¡Añádelo a tu carrito y disfruta de envío gratis!`;
    }

    if (prompt.includes('chatbot') || prompt.includes('Usuario dice')) {
      return "¡Hola! 👋 Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy? Puedo ayudarte con información de productos, envíos, devoluciones y más.";
    }

    return "Respuesta generada por IA";
  }

  private parseRecommendations(_response: string, products: Product[]): AIRecommendation[] {
    // Lógica para parsear recomendaciones de la respuesta de IA
    return products.slice(0, 5).map((product) => ({
      product,
      score: 9 - Math.floor(Math.random() * 3),
      reason: `Recomendado por tu historial de navegación`,
      type: 'ai_generated' as const
    }));
  }

  private getFallbackDescription(product: Partial<Product>): string {
    return `${product.name} - Un producto de calidad en la categoría ${product.category}. 
    Perfecto para quienes buscan una solución confiable y eficiente. 
    ¡Descubre todas sus características y beneficios!`;
  }

  private getFallbackRecommendations(products: Product[]): AIRecommendation[] {
    return products.slice(0, 3).map((product) => ({
      product,
      score: 8,
      reason: 'Producto popular entre nuestros clientes',
      type: 'trending' as const
    }));
  }
}

export const aiService = new AIService();
export default aiService;

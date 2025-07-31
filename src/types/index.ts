// Tipos principales para el E-Commerce con IA

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  tags: string[];
  isAIGenerated?: boolean; // Indica si la descripción fue generada por IA
  aiMetadata?: {
    promptUsed?: string;
    generatedAt?: Date;
    model?: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  sentiment?: 'positive' | 'negative' | 'neutral'; // Análisis de sentimiento por IA
  helpfulVotes: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  purchaseHistory: Purchase[];
}

export interface UserPreferences {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  brands: string[];
  aiRecommendationsEnabled: boolean;
}

export interface Purchase {
  id: string;
  products: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

// Tipos específicos para funcionalidades de IA
export interface AIPromptTemplate {
  id: string;
  name: string;
  category: 'product_description' | 'chatbot' | 'recommendation' | 'search';
  template: string;
  variables: string[];
  examples?: string[];
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  aiMetadata?: {
    confidence: number;
    intent?: string;
    entities?: Record<string, any>;
  };
}

export interface AIRecommendation {
  product: Product;
  score: number;
  reason: string;
  type: 'collaborative' | 'content_based' | 'trending' | 'ai_generated';
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  searchMetadata?: {
    query: string;
    semanticMatches?: string[];
    suggestedQueries?: string[];
    processingTime: number;
  };
}

// Tipos para la gestión de estado
export interface AppState {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  searchQuery: string;
  currentCategory: string;
  loading: boolean;
  error: string | null;
}

export interface AIState {
  chatMessages: ChatMessage[];
  recommendations: AIRecommendation[];
  isGeneratingDescription: boolean;
  isChatbotTyping: boolean;
  searchSuggestions: string[];
}

import { useState } from 'react';
import ProductCatalog from './components/products/ProductCatalogSimple';
import AIChat from './components/ai/AIChatSimple';
import './App-fullwidth.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  // Sugerencias de búsqueda predefinidas
  const allSuggestions = [
    'iPhone 14 Pro', 'Samsung Galaxy', 'MacBook', 'ASUS ROG', 'Gaming Laptop',
    'Auriculares Bluetooth', 'AirPods', 'Smart Watch', 'Apple Watch',
    'Tablet iPad', 'Cámara 4K', 'Sony Alpha', 'Monitor Gaming',
    'RTX 4080', 'Procesador Intel', 'SSD 1TB', 'Memoria RAM',
    'Teclado mecánico', 'Mouse gaming', 'Webcam HD'
  ];

  // Función para manejar la búsqueda con sugerencias
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 1) {
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    // La búsqueda ya funciona automáticamente con el searchQuery
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    setQuickFilters([]);
  };

  // Búsqueda por voz (simulada)
  const startVoiceSearch = () => {
    setIsListening(true);
    
    // Simular reconocimiento de voz
    setTimeout(() => {
      const voiceQueries = [
        'iPhone 14 Pro',
        'laptop gaming',
        'auriculares bluetooth',
        'smart watch',
        'cámara 4k'
      ];
      const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
      setSearchQuery(randomQuery);
      setIsListening(false);
    }, 2000);
  };

  // Filtros rápidos basados en tendencias
  const applyQuickFilter = (filter: string) => {
    setSearchQuery(filter);
    setQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const trendingSearches = ['Gaming', 'Apple', 'Bluetooth', '4K', 'Pro'];

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🛍️ TechStore Pro</h1>
          <p>E-Commerce potenciado con Inteligencia Artificial</p>
          
          {/* Barra de búsqueda mejorada */}
          <form onSubmit={handleSearchSubmit} className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder={isListening ? "🎤 Escuchando..." : "Buscar productos... (ej: iPhone, gaming, auriculares)"}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className={`search-input ${isListening ? 'listening' : ''}`}
                disabled={isListening}
              />
              {searchQuery && !isListening && (
                <button 
                  type="button"
                  onClick={clearSearch}
                  className="clear-search-btn"
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
              
              {/* Sugerencias de búsqueda */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      🔍 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Botón de búsqueda por voz */}
            <button 
              type="button"
              onClick={startVoiceSearch}
              className={`voice-search-btn ${isListening ? 'listening' : ''}`}
              title="Búsqueda por voz"
              disabled={isListening}
            >
              {isListening ? '🎙️' : '🎤'}
            </button>
            
            <button type="submit" className="search-btn" title="Buscar">
              🔍
            </button>
          </form>

          {/* Filtros rápidos */}
          <div className="quick-filters">
            <span className="filters-label">🔥 Tendencias:</span>
            {trendingSearches.map((trend, index) => (
              <button
                key={index}
                onClick={() => applyQuickFilter(trend)}
                className={`quick-filter-btn ${quickFilters.includes(trend) ? 'active' : ''}`}
              >
                {trend}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        {/* Mostrar resultados de búsqueda */}
        {searchQuery && (
          <div className="search-results-info">
            <h2>🔍 Resultados para: "{searchQuery}"</h2>
            <p>Encuentra los mejores productos tecnológicos</p>
          </div>
        )}
        <ProductCatalog searchQuery={searchQuery} />
      </main>

      {/* Botón de chat flotante */}
      <button 
        className="chat-toggle-btn"
        onClick={() => setIsChatOpen(!isChatOpen)}
        title="Asistente Virtual"
      >
        💬
      </button>

      {/* Chatbot de IA */}
      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🤖 Funcionalidades IA</h3>
            <ul>
              <li>✅ Descripciones generadas automáticamente</li>
              <li>✅ Chatbot de atención 24/7</li>
              <li>✅ Recomendaciones personalizadas</li>
              <li>✅ Búsqueda inteligente</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>🛒 Información</h3>
            <ul>
              <li>Envío gratis en compras +$50</li>
              <li>Devoluciones en 30 días</li>
              <li>Soporte técnico especializado</li>
              <li>Garantía en todos los productos</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>📞 Contacto</h3>
            <ul>
              <li>Email: info@techstorepro.com</li>
              <li>Teléfono: +1 (555) 123-4567</li>
              <li>Chat: Asistente virtual disponible</li>
              <li>Horario: 24/7 con IA</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TechStore Pro - E-Commerce con IA. Creado por un Ingeniero de Prompts.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

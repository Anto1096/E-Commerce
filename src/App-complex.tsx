import { useState } from 'react';
import ProductCatalog from './components/products/ProductCatalog';
import AIChat from './components/ai/AIChat';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🛍️ TechStore Pro</h1>
          <p>E-Commerce potenciado con Inteligencia Artificial</p>
          
          {/* Barra de búsqueda */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar productos... (ej: smartphone, laptop, auriculares)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
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

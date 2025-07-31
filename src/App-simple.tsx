import { useState } from 'react';
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
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>¡Bienvenido a TechStore Pro!</h2>
          <p>Tu e-commerce con inteligencia artificial está funcionando correctamente.</p>
          
          <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '12px', margin: '20px 0' }}>
            <h3>🤖 Funcionalidades de IA Disponibles:</h3>
            <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
              <li>✅ Generador de descripciones de productos</li>
              <li>✅ Chatbot de atención al cliente</li>
              <li>✅ Sistema de recomendaciones</li>
              <li>✅ Búsqueda inteligente</li>
            </ul>
          </div>

          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '24px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '20px'
            }}
          >
            {isChatOpen ? 'Cerrar Chat' : '💬 Abrir Chat de IA'}
          </button>

          {searchQuery && (
            <div style={{ marginTop: '20px', padding: '10px', background: '#e0f2fe', borderRadius: '8px' }}>
              <p>🔍 Buscando: "<strong>{searchQuery}</strong>"</p>
            </div>
          )}
        </div>
      </main>

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

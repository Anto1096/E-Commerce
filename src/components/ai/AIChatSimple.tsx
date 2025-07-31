import React, { useState } from 'react';
import './ChatbotModal.css';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimpleMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<SimpleMessage[]>([
    {
      id: '1',
      message: '¡Hola! 👋 Soy tu asistente virtual de E-Commerce. Estoy aquí para ayudarte con cualquier pregunta sobre productos, envíos, garantías y más. ¿En qué puedo ayudarte hoy? 😊',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: SimpleMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const responses = [
        '¡Por supuesto! 😊 Estoy aquí para ayudarte con cualquier pregunta sobre nuestros productos tecnológicos.',
        '🔍 Tenemos una gran variedad de productos. ¿Buscas algo específico como laptops, smartphones o accesorios?',
        '📦 Te puedo ayudar con información sobre envíos, devoluciones, especificaciones técnicas y más.',
        '🛠️ Si necesitas soporte técnico especializado, puedo conectarte con nuestro equipo de expertos.',
        '✨ Nuestros productos incluyen garantía completa y soporte 24/7. ¿Te interesa algún producto en particular?',
        '💳 También puedo ayudarte con el proceso de compra, métodos de pago y seguimiento de pedidos.',
        '🎯 ¿Necesitas recomendaciones personalizadas? Puedo sugerirte productos según tus necesidades.',
        '📞 Para consultas específicas, nuestro equipo está disponible las 24 horas. ¿En qué más puedo asistirte?'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];      const aiMessage: SimpleMessage = {
        id: (Date.now() + 1).toString(),
        message: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    '🛍️ ¿Qué productos tienen en oferta?',
    '📦 ¿Cómo funciona el envío gratuito?',
    '🔄 ¿Cuál es la política de devoluciones?',
    '💳 ¿Qué métodos de pago aceptan?',
    '🎯 ¿Pueden recomendarme un producto?',
    '📞 ¿Cómo contacto con soporte técnico?'
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-overlay" onClick={onClose}>
      <div className="ai-chat-container" onClick={(e) => e.stopPropagation()}>
        <div className="ai-chat-header">
          <div className="ai-chat-title">
            <div className="ai-avatar">🤖</div>
            <div>
              <h3>🚀 Asistente Virtual</h3>
              <span className="ai-status">En línea</span>
            </div>
          </div>
          <button onClick={onClose} className="chat-close-btn">✕</button>
        </div>

        <div className="ai-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-content">
                {message.message}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai-message">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="quick-questions">
            <p>💬 Preguntas frecuentes:</p>
            <div className="quick-questions-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="quick-question-btn"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="ai-chat-input-form">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="chat-input"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="send-btn"
              disabled={!inputMessage.trim() || isTyping}
            >
              📤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;

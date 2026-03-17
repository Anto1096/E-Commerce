import React, { useEffect, useRef, useState } from 'react';
import { aiService } from '../../services/ai/aiService';
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
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: SimpleMessage = {
      id: Date.now().toString(),
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await aiService.processChatMessage(messageText, {
        channel: 'chatbot_modal',
      });

      const aiMessage: SimpleMessage = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error en el chatbot:', error);

      const fallbackMessage: SimpleMessage = {
        id: (Date.now() + 1).toString(),
        message:
          'Lo siento, tuve un problema al responder. Intenta nuevamente o consulta por productos, envios y devoluciones.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(inputMessage);
  };

  const quickQuestions = [
    '🛍️ ¿Qué productos tienen en oferta?',
    '📦 ¿Cómo funciona el envío gratuito?',
    '🔄 ¿Cuál es la política de devoluciones?',
    '💳 ¿Qué métodos de pago aceptan?',
    '🎯 ¿Pueden recomendarme un producto?',
    '📞 ¿Cómo contacto con soporte técnico?'
  ];

  const handleQuickQuestion = async (question: string) => {
    await sendMessage(question);
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

        <div className="ai-chat-messages" ref={messagesRef}>
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
                  onClick={() => void handleQuickQuestion(question)}
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

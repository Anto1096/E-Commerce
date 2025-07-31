import React, { useState } from 'react';
import type { Product } from '../../types';
import CheckoutModal from '../checkout/CheckoutModal';
import './CartModal.css';

interface CartItem extends Product {
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: {[key: string]: number};
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cart,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  // Convertir cart object a array de CartItems
  const cartItems: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return product ? { ...product, quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50; // Envío gratis para compras > $1000
  const tax = subtotal * 0.16; // 16% IVA
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (orderData: any) => {
    console.log('Pedido completado:', orderData);
    setIsCheckoutOpen(false);
    onClearCart();
    onClose();
    alert(`🎉 ¡Pedido ${orderData.orderNumber} confirmado! Revisa tu email para más detalles.`);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-modal-overlay" onClick={onClose} />
      
      {/* Modal */}
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2>🛒 Carrito de Compras</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-modal-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Tu carrito está vacío</h3>
              <p>¡Agrega productos para comenzar a comprar!</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Continuar comprando
              </button>
            </div>
          ) : (
            <>
              {/* Items del carrito */}
              <div className="cart-items">
                <div className="cart-items-header">
                  <h3>Productos ({totalItems} artículos)</h3>
                  {cartItems.length > 1 && (
                    <button className="clear-cart-btn" onClick={onClearCart}>
                      🗑️ Vaciar carrito
                    </button>
                  )}
                </div>

                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-category">{item.category}</p>
                        <div className="cart-item-price">
                          <span className="unit-price">${item.price} c/u</span>
                          {item.originalPrice && (
                            <span className="original-price">${item.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button 
                          className="remove-item-btn"
                          onClick={() => onRemoveItem(item.id)}
                          title="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen de compra */}
              <div className="cart-summary">
                <h3>📋 Resumen de compra</h3>
                
                <div className="summary-line">
                  <span>🛍️ Subtotal ({totalItems} productos)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-line">
                  <span>🚚 Envío {shipping === 0 && '🎉 GRATIS'}</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <div className="summary-line">
                  <span>📊 IVA (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="summary-line total-line">
                  <span><strong>💰 Total</strong></span>
                  <span><strong>${total.toFixed(2)}</strong></span>
                </div>

                {shipping === 0 && (
                  <div className="free-shipping-notice">
                    ✅ ¡Envío gratuito aplicado!
                  </div>
                )}

                <div className="cart-actions">
                  <button className="continue-shopping-btn" onClick={onClose}>
                    🛒 Continuar comprando
                  </button>
                  
                  <button className="checkout-btn" onClick={handleCheckout}>
                    💳 Proceder al pago
                  </button>
                </div>

                {/* Información adicional */}
                <div className="cart-info">
                  <div className="info-item">
                    <span className="info-icon">🚚</span>
                    <span>Envío gratis en compras superiores a $1,000</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">🔒</span>
                    <span>Compra 100% segura y protegida</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">↩️</span>
                    <span>30 días para devoluciones gratuitas</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0]
        }))}
        total={total}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
};

export default CartModal;

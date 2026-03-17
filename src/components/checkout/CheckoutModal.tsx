import React, { useState } from 'react';
import './CheckoutModal.css';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  onOrderComplete: (orderData: {
    orderNumber: string;
    customer: CustomerInfo;
    shipping: ShippingInfo;
    payment: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      cardholderName: string;
      paymentMethod: 'credit' | 'debit' | 'paypal';
    };
    items: CheckoutModalProps['cartItems'];
    total: number;
    orderDate: string;
    status: 'confirmed';
  }) => void;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  paymentMethod: 'credit' | 'debit' | 'paypal';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México'
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'credit'
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const steps = [
    { number: 1, title: 'Información Personal', icon: '👤' },
    { number: 2, title: 'Dirección de Envío', icon: '🚚' },
    { number: 3, title: 'Método de Pago', icon: '💳' },
    { number: 4, title: 'Confirmación', icon: '✅' }
  ];

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(customerInfo.email && customerInfo.firstName && customerInfo.lastName && customerInfo.phone);
      case 2:
        return !!(shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.zipCode);
      case 3:
        return !!(paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardholderName);
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processOrder = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const orderNum = `ORD-${Date.now()}`;
    setOrderNumber(orderNum);
    setCurrentStep(5); // Página de confirmación
    setIsProcessing(false);

    const orderData = {
      orderNumber: orderNum,
      customer: customerInfo,
      shipping: shippingInfo,
      payment: { ...paymentInfo, cardNumber: '**** **** **** ' + paymentInfo.cardNumber.slice(-4) },
      items: cartItems,
      total,
      orderDate: new Date().toISOString(),
      status: 'confirmed' as const
    };

    onOrderComplete(orderData);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setPaymentInfo(prev => ({ ...prev, cardNumber: formatCardNumber(value) }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setPaymentInfo(prev => ({ ...prev, expiryDate: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="checkout-step-content">
            <h3>📋 Información Personal</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  value={customerInfo.firstName}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido *</label>
                <input
                  type="text"
                  value={customerInfo.lastName}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Tu apellido"
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+52 555 123 4567"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="checkout-step-content">
            <h3>🏠 Dirección de Envío</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Dirección *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Calle, número, colonia"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Ciudad"
                  required
                />
              </div>
              <div className="form-group">
                <label>Estado *</label>
                <select
                  value={shippingInfo.state}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                  required
                >
                  <option value="">Selecciona estado</option>
                  <option value="CDMX">Ciudad de México</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Nuevo León">Nuevo León</option>
                  <option value="Puebla">Puebla</option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Yucatán">Yucatán</option>
                </select>
              </div>
              <div className="form-group">
                <label>Código Postal *</label>
                <input
                  type="text"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                  placeholder="12345"
                  required
                />
              </div>
              <div className="form-group">
                <label>País</label>
                <input
                  type="text"
                  value={shippingInfo.country}
                  readOnly
                  className="readonly"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="checkout-step-content">
            <h3>💳 Método de Pago</h3>
            <div className="payment-methods">
              <div className="payment-method-tabs">
                <button
                  type="button"
                  className={`tab ${paymentInfo.paymentMethod === 'credit' ? 'active' : ''}`}
                  onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: 'credit' }))}
                >
                  💳 Tarjeta de Crédito
                </button>
                <button
                  type="button"
                  className={`tab ${paymentInfo.paymentMethod === 'debit' ? 'active' : ''}`}
                  onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: 'debit' }))}
                >
                  💳 Tarjeta de Débito
                </button>
                <button
                  type="button"
                  className={`tab ${paymentInfo.paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentInfo(prev => ({ ...prev, paymentMethod: 'paypal' }))}
                >
                  🅿️ PayPal
                </button>
              </div>

              {paymentInfo.paymentMethod !== 'paypal' ? (
                <div className="card-form">
                  <div className="form-group full-width">
                    <label>Número de Tarjeta *</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Vencimiento *</label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Nombre del Titular *</label>
                    <input
                      type="text"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                      placeholder="Nombre como aparece en la tarjeta"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="paypal-info">
                  <div className="paypal-notice">
                    <p>🅿️ Serás redirigido a PayPal para completar el pago de forma segura.</p>
                    <p>💡 PayPal protege tu información financiera.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="checkout-step-content">
            <h3>📋 Confirma tu Pedido</h3>
            <div className="order-summary">
              <div className="summary-section">
                <h4>👤 Información Personal</h4>
                <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                <p>{customerInfo.email}</p>
                <p>{customerInfo.phone}</p>
              </div>
              
              <div className="summary-section">
                <h4>🚚 Dirección de Envío</h4>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p>{shippingInfo.country}</p>
              </div>
              
              <div className="summary-section">
                <h4>💳 Método de Pago</h4>
                <p>
                  {paymentInfo.paymentMethod === 'paypal' 
                    ? '🅿️ PayPal' 
                    : `💳 ${paymentInfo.paymentMethod === 'credit' ? 'Crédito' : 'Débito'} **** ${paymentInfo.cardNumber.slice(-4)}`
                  }
                </p>
              </div>
              
              <div className="summary-section">
                <h4>🛒 Productos ({cartItems.length})</h4>
                <div className="order-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Cantidad: {item.quantity}</span>
                        <span className="item-price">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <h4>💰 Total: ${total.toFixed(2)}</h4>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="checkout-step-content success-page">
            <div className="success-content">
              <div className="success-icon">🎉</div>
              <h2>¡Pedido Confirmado!</h2>
              <p className="order-number">Número de pedido: <strong>{orderNumber}</strong></p>
              <div className="success-details">
                <p>✅ Tu pedido ha sido procesado exitosamente</p>
                <p>📧 Recibirás un email de confirmación en {customerInfo.email}</p>
                <p>📦 Tiempo estimado de entrega: 3-5 días hábiles</p>
                <p>🚚 Podrás rastrear tu pedido con el número: {orderNumber}</p>
              </div>
              <div className="success-actions">
                <button className="primary-btn" onClick={onClose}>
                  🏠 Continuar Comprando
                </button>
                <button className="secondary-btn" onClick={() => window.print()}>
                  🖨️ Imprimir Confirmación
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>🛒 Finalizar Compra</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {currentStep <= 4 && (
          <div className="checkout-progress">
            {steps.map(step => (
              <div
                key={step.number}
                className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
              >
                <div className="step-circle">
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="checkout-body">
          {renderStepContent()}
        </div>

        {currentStep <= 4 && (
          <div className="checkout-footer">
            <div className="footer-actions">
              {currentStep > 1 && currentStep < 5 && (
                <button className="secondary-btn" onClick={handlePrevStep}>
                  ← Anterior
                </button>
              )}
              
              {currentStep < 4 && (
                <button
                  className="primary-btn"
                  onClick={handleNextStep}
                  disabled={!validateStep(currentStep)}
                >
                  Siguiente →
                </button>
              )}
              
              {currentStep === 4 && (
                <button
                  className="primary-btn checkout-btn"
                  onClick={processOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? '⏳ Procesando...' : '💳 Pagar Ahora'}
                </button>
              )}
            </div>
            
            <div className="order-summary-footer">
              <span className="total-amount">Total: ${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;

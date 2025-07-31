import React, { useState } from 'react';
import type { Product } from '../../types';
import CartModal from '../cart/CartModal';
import './ProductCatalog-fullwidth.css';

interface ProductCatalogProps {
  searchQuery?: string;
}

// Datos de ejemplo simplificados
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Deep Purple',
    description: 'El iPhone más avanzado con chip A16 Bionic, cámara profesional de 48MP y Dynamic Island.',
    price: 1199,
    originalPrice: 1299,
    category: 'Electrónicos',
    subcategory: 'Smartphones',
    images: ['https://mcprod.jumbo.ae/media/catalog/product/i/p/iphone_15_pro_max_natural_titanium_pdp_image_position-1__en-me_6.jpg'],
    stock: 12,
    rating: 4.9,
    reviews: [],
    tags: ['5G', 'A16 Bionic', 'Cámara 48MP', 'Dynamic Island', 'Deep Purple', 'ProRAW']
  },
  {
    id: '2',
    name: 'ASUS ROG Strix Gaming Laptop',
    description: 'Laptop gaming de alto rendimiento con diseño ROG exclusivo, pantalla 144Hz y RGB personalizable.',
    price: 2499,
    originalPrice: 2799,
    category: 'Electrónicos',
    subcategory: 'Computadoras',
    images: ['https://cdn.mos.cms.futurecdn.net/68x3atDrq4whuUUvUUSNf4.png'],
    stock: 6,
    rating: 4.9,
    reviews: [],
    tags: ['Gaming', 'ROG', 'RTX 4080', '32GB RAM', 'SSD 1TB', 'RGB', '144Hz']
  },
  {
    id: '3',
    name: 'Auriculares Inalámbricos Pro',
    description: 'Auriculares con cancelación de ruído activa y sonido Hi-Fi.',
    price: 249,
    originalPrice: 299,
    category: 'Audio',
    subcategory: 'Auriculares',
    images: ['https://tse3.mm.bing.net/th/id/OIP.XXo5AlGYHxi4vcFNuekCfQHaHa?w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 25,
    rating: 4.7,
    reviews: [],
    tags: ['Bluetooth 5.0', 'Cancelación de ruido', 'Hi-Fi', '30h batería']
  },
  {
    id: '4',
    name: 'Smart Watch Series 9',
    description: 'Reloj inteligente con monitoreo de salud avanzado y GPS integrado.',
    price: 399,
    originalPrice: 449,
    category: 'Wearables',
    subcategory: 'Smartwatch',
    images: ['https://tse3.mm.bing.net/th/id/OIP._fTWz6hT_mEyhXeRI6JLUQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 20,
    rating: 4.6,
    reviews: [],
    tags: ['GPS', 'Salud', 'Waterproof', 'Siri']
  },
  {
    id: '5',
    name: 'Tablet Pro 12.9 pulgadas',
    description: 'Tablet profesional con chip M2 y Apple Pencil compatible.',
    price: 1099,
    category: 'Electrónicos',
    subcategory: 'Tablets',
    images: ['https://p2-ofp.static.pub/fes/cms/2021/10/28/juqs65pgl1gh3dysi7yv1tnvtsiqva364946.png'],
    stock: 12,
    rating: 4.9,
    reviews: [],
    tags: ['M2 Chip', 'Apple Pencil', '12.9"', 'ProMotion']
  },
  {
    id: '6',
    name: 'Cámara Mirrorless 4K',
    description: 'Cámara profesional sin espejo con grabación 4K y estabilización.',
    price: 2299,
    originalPrice: 2599,
    category: 'Fotografía',
    subcategory: 'Cámaras',
    images: ['https://m.media-amazon.com/images/I/71h5Y3UTIqL._AC_.jpg'],
    stock: 6,
    rating: 4.8,
    reviews: [],
    tags: ['4K Video', 'Mirrorless', 'Full Frame', '61MP']
  },
  {
    id: '7',
    name: 'Monitor Gaming 4K OLED 27"',
    description: 'Monitor OLED de 27 pulgadas con 144Hz, HDR10 y tiempo de respuesta de 1ms.',
    price: 899,
    originalPrice: 1099,
    category: 'Electrónicos',
    subcategory: 'Monitores',
    images: ['https://tse4.mm.bing.net/th/id/OIP.JDLbM27gtH1kDo495DyxwwHaFc?rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 15,
    rating: 4.8,
    reviews: [],
    tags: ['OLED', '4K', '144Hz', 'HDR10', '1ms', 'Gaming']
  },
  {
    id: '8',
    name: 'Teclado Mecánico RGB Pro',
    description: 'Teclado mecánico gaming con switches Cherry MX, retroiluminación RGB y reposamuñecas.',
    price: 189,
    originalPrice: 229,
    category: 'Accesorios',
    subcategory: 'Periféricos',
    images: ['https://tse4.mm.bing.net/th/id/OIP.Fyj__8M6gqC8GNdKRYIbaAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 30,
    rating: 4.7,
    reviews: [],
    tags: ['Cherry MX', 'RGB', 'Mecánico', 'Gaming', 'Wireless']
  },
  {
    id: '9',
    name: 'PlayStation 5 Console',
    description: 'Consola de videojuegos de nueva generación con SSD ultra rápido y ray tracing.',
    price: 499,
    originalPrice: 549,
    category: 'Gaming',
    subcategory: 'Consolas',
    images: ['https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$'],
    stock: 8,
    rating: 4.9,
    reviews: [],
    tags: ['PS5', 'Ray Tracing', 'SSD', '4K Gaming', 'DualSense']
  },
  {
    id: '10',
    name: 'Drone Profesional 4K',
    description: 'Drone con cámara 4K, estabilización gimbal de 3 ejes y 35 minutos de vuelo.',
    price: 1299,
    originalPrice: 1499,
    category: 'Fotografía',
    subcategory: 'Drones',
    images: ['https://exitocol.vtexassets.com/arquivos/ids/25381155/drone-profesional-camara-4k-wifi-5g-motores-brushless-con-gps-doble-bateria-sensor-evita-obstaculos.jpg?v=638648605186330000'],
    stock: 10,
    rating: 4.6,
    reviews: [],
    tags: ['4K Camera', 'Gimbal 3D', '35min vuelo', 'GPS', 'Obstacle Avoidance']
  },
  {
    id: '11',
    name: 'Altavoces Bluetooth Premium',
    description: 'Sistema de altavoces estéreo con sonido envolvente, Bluetooth 5.0 y 20h de batería.',
    price: 329,
    originalPrice: 399,
    category: 'Audio',
    subcategory: 'Altavoces',
    images: ['https://tse3.mm.bing.net/th/id/OIP.D4KNR0SMxw6ckBPzhxmJHAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 22,
    rating: 4.5,
    reviews: [],
    tags: ['Bluetooth 5.0', 'Estéreo', '20h batería', 'Bass reflex', 'Waterproof']
  },
  {
    id: '12',
    name: 'SSD Externo 2TB USB-C',
    description: 'Disco SSD externo de alta velocidad con USB-C 3.2, ideal para profesionales.',
    price: 279,
    originalPrice: 329,
    category: 'Almacenamiento',
    subcategory: 'Discos Externos',
    images: ['https://tse2.mm.bing.net/th/id/OIP.lktR8teQJx85F03nHWzVxwHaFI?rs=1&pid=ImgDetMain&o=7&rm=3'],
    stock: 35,
    rating: 4.7,
    reviews: [],
    tags: ['2TB', 'USB-C 3.2', 'Portátil', '1000MB/s', 'Cifrado']
  }
];

// Función helper para iconos de categorías
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Electrónicos': '💻',
    'Audio': '🎧',
    'Wearables': '⌚',
    'Fotografía': '📷',
    'Gaming': '🎮',
    'Accesorios': '⌨️',
    'Almacenamiento': '💾'
  };
  return icons[category] || '📦';
};

const ProductCatalog: React.FC<ProductCatalogProps> = ({ searchQuery = '' }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState<string | null>(null);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  // Filtrar productos
  React.useEffect(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por rango de precios
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case '500-1000':
          filtered = filtered.filter(product => product.price >= 500 && product.price < 1000);
          break;
        case '1000-2000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price < 2000);
          break;
        case 'over-2000':
          filtered = filtered.filter(product => product.price >= 2000);
          break;
      }
    }

    // Ordenamiento
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // 'featured'
        // Mantener orden original
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);

  const generateAIDescription = async (productId: string) => {
    setIsGeneratingDescription(productId);
    
    // Simular llamada a IA
    setTimeout(() => {
      const aiDescription = `🤖 Descripción mejorada con IA: Este producto revolucionario combina tecnología de vanguardia con diseño elegante. Perfecto para usuarios exigentes que buscan calidad superior y rendimiento excepcional. Con características premium y garantía extendida.`;
      
      setFilteredProducts(prev => prev.map(p => 
        p.id === productId 
          ? { ...p, description: aiDescription, isAIGenerated: true }
          : p
      ));
      setIsGeneratingDescription(null);
    }, 2000);
  };

  const addToCart = async (productId: string) => {
    setAddingToCart(productId);
    
    // Simular proceso de añadir al carrito
    setTimeout(() => {
      const product = products.find(p => p.id === productId);
      const newQuantity = (cart[productId] || 0) + 1;
      
      setCart(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
      setAddingToCart(null);
      
      // Mostrar notificación elegante
      setNotification({
        message: `✅ ${product?.name} añadido al carrito! (${newQuantity} en total)`,
        type: 'success'
      });
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => setNotification(null), 3000);
    }, 800);
  };

  const getCartQuantity = (productId: string): number => {
    return cart[productId] || 0;
  };

  // Funciones del carrito modal
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));
    
    // Mostrar notificación
    const product = products.find(p => p.id === productId);
    setNotification({
      message: `📦 ${product?.name} actualizado (${quantity} en carrito)`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
    
    setNotification({
      message: `🗑️ ${product?.name} eliminado del carrito`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const clearCart = () => {
    setCart({});
    setNotification({
      message: '🧹 Carrito vaciado completamente',
      type: 'success'
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const totalCartItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setPriceRange('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || sortBy !== 'featured' || priceRange !== 'all';

  return (
    <div className="product-catalog">
      {/* Notificación */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      {/* Filtros mejorados */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label>Categoría</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? '🛍️ Todas las categorías' : `${getCategoryIcon(cat)} ${cat}`}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Precio</label>
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
              className="filter-select"
            >
              <option value="all">💰 Todos los precios</option>
              <option value="under-500">💵 Menos de $500</option>
              <option value="500-1000">💸 $500 - $1,000</option>
              <option value="1000-2000">💎 $1,000 - $2,000</option>
              <option value="over-2000">👑 Más de $2,000</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="featured">⭐ Destacados</option>
              <option value="price-low">💲 Precio: Menor a mayor</option>
              <option value="price-high">💰 Precio: Mayor a menor</option>
              <option value="rating">🌟 Mejor valorados</option>
              <option value="name">🔤 Nombre A-Z</option>
            </select>
          </div>
        </div>
        
        <div className="filter-info">
          <div className="filter-actions">
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="clear-filters-btn"
                title="Limpiar todos los filtros"
              >
                🗑️ Limpiar filtros
              </button>
            )}
          </div>
          <span>📊 {filteredProducts.length} de {products.length} productos</span>
          <div className="filter-stats">
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <span className="stat-label">Precio promedio:</span>
              <span className="stat-value">
                ${filteredProducts.length > 0 
                  ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(0)
                  : '0'
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de recomendaciones simplificada */}
      <div className="ai-recommendations">
        <h3>🤖 Recomendaciones para ti</h3>
        <div className="recommendations-grid">
          {products.slice(0, 2).map((product) => (
            <div key={product.id} className="recommendation-card">
              <img src={product.images[0]} alt={product.name} />
              <div className="rec-info">
                <h4>{product.name}</h4>
                <p className="rec-reason">Basado en tus preferencias</p>
                <div className="rec-score">Score: 9/10</div>
                <div className="price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="products-section">
        <div className="section-header">
          <h2>Productos ({filteredProducts.length})</h2>
          {searchQuery && (
            <p className="search-info">Resultados para: "{searchQuery}"</p>
          )}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
                {product.originalPrice && (
                  <div className="discount-badge">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                
                <div className="product-rating">
                  ⭐ {product.rating} ({product.reviews.length} reseñas)
                </div>

                <div className="product-description">
                  {product.description}
                  {product.isAIGenerated && (
                    <span className="ai-badge">🤖 Mejorado con IA</span>
                  )}
                </div>

                <div className="product-tags">
                  {product.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="product-pricing">
                  <div className="current-price">${product.price}</div>
                  {product.originalPrice && (
                    <div className="original-price">${product.originalPrice}</div>
                  )}
                </div>

                <div className="product-actions">
                  <button 
                    className="ai-description-btn"
                    onClick={() => generateAIDescription(product.id)}
                    disabled={isGeneratingDescription === product.id}
                  >
                    {isGeneratingDescription === product.id ? 
                      '🤖 Generando...' : 
                      '🤖 Mejorar descripción'
                    }
                  </button>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product.id)}
                    disabled={addingToCart === product.id || product.stock === 0}
                    data-state={
                      product.stock === 0 ? 'out-of-stock' :
                      addingToCart === product.id ? 'adding' :
                      getCartQuantity(product.id) > 0 ? 'in-cart' : 'default'
                    }
                  >
                    {addingToCart === product.id ? (
                      '🔄 Añadiendo...'
                    ) : product.stock === 0 ? (
                      '❌ Agotado'
                    ) : getCartQuantity(product.id) > 0 ? (
                      `🛒 En carrito (${getCartQuantity(product.id)})`
                    ) : (
                      '🛒 Añadir al carrito'
                    )}
                  </button>
                </div>

                <div className="stock-info">
                  {product.stock > 0 ? (
                    <span className="in-stock">✅ {product.stock} disponibles</span>
                  ) : (
                    <span className="out-of-stock">❌ Agotado</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar los filtros o cambiar tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Modal del carrito */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        products={products}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Botón flotante del carrito */}
      {totalCartItems > 0 && (
        <button className="floating-cart-btn" onClick={openCartModal}>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{totalCartItems}</span>
        </button>
      )}
    </div>
  );
};

export default ProductCatalog;

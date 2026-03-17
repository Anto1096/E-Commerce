import React, { useState, useEffect, useCallback } from 'react';
import { aiService } from '../../services/ai/aiService';
import type { Product, AIRecommendation } from '../../types';
import './ProductCatalog.css';

interface ProductCatalogProps {
  searchQuery?: string;
}

// Datos de ejemplo - En producción vendrían de una API
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro Max 256GB',
    description: 'El smartphone más avanzado con cámara profesional y batería de larga duración.',
    price: 899,
    originalPrice: 999,
    category: 'Electrónicos',
    subcategory: 'Smartphones',
    images: ['https://via.placeholder.com/300x300?text=Smartphone'],
    stock: 15,
    rating: 4.8,
    reviews: [],
    tags: ['5G', 'Cámara 108MP', 'Batería 5000mAh', 'Pantalla OLED']
  },
  {
    id: '2',
    name: 'Laptop Gaming RTX 4070',
    description: 'Potente laptop para gaming con procesador i7 y gráficos RTX 4070.',
    price: 1599,
    category: 'Electrónicos',
    subcategory: 'Computadoras',
    images: ['https://via.placeholder.com/300x300?text=Laptop'],
    stock: 8,
    rating: 4.9,
    reviews: [],
    tags: ['Gaming', 'RTX 4070', 'i7', '16GB RAM', 'SSD 1TB']
  },
  {
    id: '3',
    name: 'Auriculares Inalámbricos Pro',
    description: 'Auriculares con cancelación de ruido activa y sonido Hi-Fi.',
    price: 249,
    originalPrice: 299,
    category: 'Audio',
    subcategory: 'Auriculares',
    images: ['https://via.placeholder.com/300x300?text=Auriculares'],
    stock: 25,
    rating: 4.7,
    reviews: [],
    tags: ['Bluetooth 5.0', 'Cancelación de ruido', 'Hi-Fi', '30h batería']
  }
];

const ProductCatalog: React.FC<ProductCatalogProps> = ({ searchQuery = '' }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 2000 });

  const filterProducts = useCallback(() => {
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

    // Filtro por precio
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange]);

  const generateRecommendations = useCallback(async () => {
    try {
      const userProfile = {
        viewedProducts: ['Smartphone', 'Laptop'],
        preferredCategories: ['Electrónicos'],
        priceRange: { min: 0, max: 1000 }
      };

      const recs = await aiService.generateRecommendations(userProfile, products);
      setRecommendations(recs.slice(0, 3));
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  }, [products]);

  useEffect(() => {
    filterProducts();
    void generateRecommendations();
  }, [filterProducts, generateRecommendations]);

  const generateAIDescription = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setIsGeneratingDescription(productId);

    try {
      const aiDescription = await aiService.generateProductDescription(product);
      
      // Actualizar el producto con la nueva descripción
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { 
              ...p, 
              description: aiDescription,
              isAIGenerated: true,
              aiMetadata: {
                generatedAt: new Date(),
                model: 'GPT-4',
                promptUsed: 'product_description_detailed'
              }
            }
          : p
      ));
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setIsGeneratingDescription(null);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="product-catalog">
      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Categoría:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas las categorías' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Rango de precio:</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="price-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="price-input"
            />
          </div>
        </div>
      </div>

      {/* Recomendaciones de IA */}
      {recommendations.length > 0 && (
        <div className="ai-recommendations">
          <h3>🤖 Recomendaciones para ti</h3>
          <div className="recommendations-grid">
            {recommendations.map((rec) => (
              <div key={rec.product.id} className="recommendation-card">
                <img src={rec.product.images[0]} alt={rec.product.name} />
                <div className="rec-info">
                  <h4>{rec.product.name}</h4>
                  <p className="rec-reason">{rec.reason}</p>
                  <div className="rec-score">
                    Score: {rec.score}/10
                  </div>
                  <div className="price">${rec.product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  
                  <button className="add-to-cart-btn">
                    Añadir al carrito
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
    </div>
  );
};

export default ProductCatalog;

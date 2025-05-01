import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Truck, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { Product } from '../types';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Convert USD to INR (1 USD = 82.50 INR approximately)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 82.50);

  useEffect(() => {
    // Simulate API loading
    const loadProduct = setTimeout(() => {
      if (!productId) {
        navigate('/');
        return;
      }
      
      const foundProduct = getProductById(productId);
      
      if (!foundProduct) {
        navigate('/');
        return;
      }
      
      setProduct(foundProduct);
      
      // Find related products in the same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      setRelatedProducts(related);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(loadProduct);
  }, [productId, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const discount = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-blue-900 mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative">
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  {discount}% OFF
                </div>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-80 md:h-96 object-contain p-4"
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? "#FBBF24" : "none"}
                    stroke={i < Math.floor(product.rating) ? "#FBBF24" : "#FBBF24"}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating.toFixed(1)}</span>
            </div>
            
            <div className="mb-6">
              {product.discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900 mr-2">
                    ₹{convertToINR(product.discountedPrice).toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{convertToINR(product.price).toLocaleString('en-IN')}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  ₹{convertToINR(product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center text-green-600 mb-2">
                <Check size={18} className="mr-2" />
                <span>In Stock: {product.stock} available</span>
              </div>
              <div className="flex items-center text-blue-900">
                <Truck size={18} className="mr-2" />
                <span>Free shipping on orders over ₹4,125</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-l-md flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="h-10 w-16 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-r-md flex items-center justify-center"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              leftIcon={<ShoppingCart size={18} />}
              size="lg"
              className="w-full md:w-auto transition-all"
              variant={addedToCart ? 'secondary' : 'primary'}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
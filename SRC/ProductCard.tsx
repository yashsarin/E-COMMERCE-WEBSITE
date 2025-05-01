import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const navigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };
  
  const discount = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  // Convert USD to INR (1 USD = 82.50 INR approximately)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 82.50);
  
  return (
    <Card hover className="h-full flex flex-col" onClick={navigateToProduct}>
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-1">
          <div className="flex text-yellow-400 mr-1">
            <Star size={16} fill="#FBBF24" />
          </div>
          <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            <span className="font-bold text-lg mr-2">
              ₹{convertToINR(product.discountedPrice || product.price).toLocaleString('en-IN')}
            </span>
            {product.discountedPrice && (
              <span className="text-gray-500 text-sm line-through">
                ₹{convertToINR(product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <Button 
            onClick={handleAddToCart}
            leftIcon={<ShoppingCart size={16} />}
            fullWidth
            className="transition-all"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
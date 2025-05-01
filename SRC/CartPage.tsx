import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const shipping = subtotal > 4125 ? 0 : 824.17; // 50 USD = 4125 INR, 9.99 USD = 824.17 INR
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  // Convert USD to INR (1 USD = 82.50 INR approximately)
  const convertToINR = (usdPrice: number) => Math.round(usdPrice * 82.50);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // In a real app, this would verify the coupon with the backend
    setCouponError('Invalid or expired coupon code');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map(item => (
                    <div key={item.productId} className="py-6 flex flex-col sm:flex-row">
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-32 object-contain"
                        />
                      </div>
                      <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                        <div className="flex justify-between mb-2">
                          <Link 
                            to={`/product/${item.productId}`} 
                            className="text-lg font-medium text-gray-900 hover:text-blue-900"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                        
                        <div className="text-gray-600 mb-4 line-clamp-2">
                          {item.product.description}
                        </div>
                        
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-l-md flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => updateQuantity(item.productId, parseInt(e.target.value))}
                              className="h-8 w-12 border-t border-b border-gray-300 text-center text-sm"
                            />
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-8 w-8 rounded-r-md flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ₹{(convertToINR((item.product.discountedPrice || item.product.price) * item.quantity)).toLocaleString('en-IN')}
                            </div>
                            {item.product.discountedPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ₹{(convertToINR(item.product.price * item.quantity)).toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/" className="text-blue-900 hover:text-blue-800 font-medium">
                &larr; Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{convertToINR(subtotal).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex mb-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-900"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm">{couponError}</p>
                  )}
                </div>
                
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight size={18} />}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  Secure payments powered by Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
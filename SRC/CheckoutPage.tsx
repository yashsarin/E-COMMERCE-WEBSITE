import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getAddressesByUserId } from '../data/addresses';
import { Address } from '../types';

type PaymentMethod = 'credit_card' | 'paypal';
type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    
    // Load user addresses
    if (user?.id) {
      const userAddresses = getAddressesByUserId(user.id);
      setAddresses(userAddresses);
      
      // If there's a default address, select it
      const defaultAddress = userAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (userAddresses.length > 0) {
        setSelectedAddressId(userAddresses[0].id);
      }
    }
  }, [isAuthenticated, navigate, user, items]);
  
  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
  };
  
  const handleContinueToPayment = () => {
    if (!selectedAddressId) return;
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handleContinueToReview = () => {
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setCurrentStep('confirmation');
      setIsProcessing(false);
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  const getSelectedAddress = () => {
    return addresses.find(addr => addr.id === selectedAddressId);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'shipping' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
              }`}>
                <MapPin size={20} />
              </div>
              <span className="text-sm mt-1">Shipping</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${currentStep !== 'shipping' ? 'bg-blue-900' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'payment' ? 'bg-blue-900 text-white' : 
                currentStep === 'shipping' ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-900'
              }`}>
                <CreditCard size={20} />
              </div>
              <span className="text-sm mt-1">Payment</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${
                currentStep === 'review' || currentStep === 'confirmation' ? 'bg-blue-900' : 'bg-gray-200'
              }`}></div>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === 'review' ? 'bg-blue-900 text-white' : 
                currentStep === 'confirmation' ? 'bg-blue-100 text-blue-900' :
                'bg-gray-200 text-gray-500'
              }`}>
                <CheckCircle size={20} />
              </div>
              <span className="text-sm mt-1">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Shipping Address
                  </h2>
                  
                  {addresses.length > 0 ? (
                    <div className="space-y-4 mb-6">
                      {addresses.map(address => (
                        <div 
                          key={address.id}
                          className={`border p-4 rounded-md cursor-pointer ${
                            selectedAddressId === address.id ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => handleAddressSelection(address.id)}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{address.name}</p>
                              <p className="text-gray-600">{address.street}</p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-gray-600">{address.country}</p>
                            </div>
                            <div className="ml-4">
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                selectedAddressId === address.id ? 'border-blue-900' : 'border-gray-300'
                              }`}>
                                {selectedAddressId === address.id && (
                                  <div className="w-3 h-3 rounded-full bg-blue-900 mx-auto mt-0.5"></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-gray-600">You don't have any saved addresses.</p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Add a New Address
                    </h3>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Address Name"
                        placeholder="Home, Work, etc."
                      />
                      <Input
                        label="Full Name"
                        placeholder="Your full name"
                      />
                      <div className="md:col-span-2">
                        <Input
                          label="Street Address"
                          placeholder="Street address"
                        />
                      </div>
                      <Input
                        label="City"
                        placeholder="City"
                      />
                      <Input
                        label="State/Province"
                        placeholder="State/Province"
                      />
                      <Input
                        label="Postal Code"
                        placeholder="Postal code"
                      />
                      <Input
                        label="Country"
                        placeholder="Country"
                      />
                      <div className="md:col-span-2 mt-2">
                        <Button variant="secondary">
                          Save Address
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={handleContinueToPayment}
                      disabled={!selectedAddressId}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div 
                      className={`border p-4 rounded-md cursor-pointer ${
                        paymentMethod === 'credit_card' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setPaymentMethod('credit_card')}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          <CreditCard size={24} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Credit Card</p>
                          <p className="text-gray-600 text-sm">Pay with Visa, Mastercard, or American Express</p>
                        </div>
                        <div className="ml-4">
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'credit_card' ? 'border-blue-900' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'credit_card' && (
                              <div className="w-3 h-3 rounded-full bg-blue-900 mx-auto mt-0.5"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border p-4 rounded-md cursor-pointer ${
                        paymentMethod === 'paypal' ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 text-blue-600 font-bold text-xl">P</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">PayPal</p>
                          <p className="text-gray-600 text-sm">Pay with your PayPal account</p>
                        </div>
                        <div className="ml-4">
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            paymentMethod === 'paypal' ? 'border-blue-900' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'paypal' && (
                              <div className="w-3 h-3 rounded-full bg-blue-900 mx-auto mt-0.5"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {paymentMethod === 'credit_card' && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h3 className="text-md font-semibold text-gray-900 mb-4">
                        Card Details
                      </h3>
                      
                      <form className="space-y-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiration Date"
                            placeholder="MM/YY"
                          />
                          <Input
                            label="CVC"
                            placeholder="123"
                          />
                        </div>
                        <Input
                          label="Cardholder Name"
                          placeholder="Name as it appears on card"
                        />
                      </form>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      variant="outlined"
                      onClick={() => setCurrentStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button onClick={handleContinueToReview}>
                      Continue to Review
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Review Step */}
              {currentStep === 'review' && (
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Review Your Order
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Shipping Address
                    </h3>
                    
                    {getSelectedAddress() && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">{getSelectedAddress()?.name}</p>
                        <p>{getSelectedAddress()?.street}</p>
                        <p>
                          {getSelectedAddress()?.city}, {getSelectedAddress()?.state} {getSelectedAddress()?.zipCode}
                        </p>
                        <p>{getSelectedAddress()?.country}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Payment Method
                    </h3>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        {paymentMethod === 'credit_card' ? (
                          <>
                            <CreditCard size={20} className="text-gray-600 mr-2" />
                            <span>Credit Card (ending in 3456)</span>
                          </>
                        ) : (
                          <>
                            <span className="text-blue-600 font-bold mr-2">P</span>
                            <span>PayPal</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Items in Your Order
                    </h3>
                    
                    <div className="border rounded-md divide-y divide-gray-200">
                      {items.map(item => (
                        <div key={item.productId} className="p-3 flex items-center">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="font-medium text-gray-900">
                              ${((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      variant="outlined"
                      onClick={() => setCurrentStep('payment')}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder}
                      isLoading={isProcessing}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Confirmation Step */}
              {currentStep === 'confirmation' && (
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You for Your Order!
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Your order has been placed and will be processed soon.
                    We've sent you an email with all the details.
                  </p>
                  
                  <div className="mb-6 bg-gray-50 p-4 rounded-md inline-block">
                    <p className="font-medium text-gray-900">Order #87634</p>
                    <p className="text-gray-600">Estimated Delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Button 
                      variant="outlined"
                      onClick={() => navigate('/orders')}
                    >
                      View Orders
                    </Button>
                    <Button onClick={() => navigate('/')}>
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          {currentStep !== 'confirmation' && (
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="mb-6 max-h-60 overflow-y-auto">
                    {items.map(item => (
                      <div key={item.productId} className="flex items-start mb-4">
                        <div className="w-12 h-12 flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="ml-3 flex-1 text-sm">
                          <p className="font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="ml-2 text-right">
                          <p className="font-medium text-gray-900">
                            ${((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Estimated Tax</span>
                      <span className="text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../data/orders';
import { Order } from '../types';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (user?.id) {
      // Simulate API loading delay
      setTimeout(() => {
        const userOrders = getOrdersByUserId(user.id);
        setOrders(userOrders);
        setIsLoading(false);
      }, 500);
    }
  }, [user]);
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-900 mr-2">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
        </div>
        
        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {orders.map((order, index) => (
              <div 
                key={order.id}
                className={`p-6 ${index !== orders.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Link to={`/orders/${order.id}`} className="ml-4 text-blue-900 hover:text-blue-800 text-sm flex items-center">
                      Details
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.productId} className="flex items-center border border-gray-200 rounded-md p-2 w-full sm:w-auto">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items.length > 3 && (
                        <div className="text-sm text-gray-600 flex items-center">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end space-y-2">
                    <p className="font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                    
                    {order.status === 'shipped' && (
                      <a href="#" className="text-blue-900 hover:text-blue-800 text-sm flex items-center">
                        Track Package
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    )}
                    
                    {(order.status === 'delivered' || order.status === 'shipped') && (
                      <a href="#" className="text-blue-900 hover:text-blue-800 text-sm flex items-center">
                        Leave a Review
                        <ChevronRight size={14} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/">
              <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-md">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
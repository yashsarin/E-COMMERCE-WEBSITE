import { Order } from '../types';

// Mock order data
export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        productId: '1',
        quantity: 1,
        product: {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          description: 'Premium noise-cancelling headphones with 20-hour battery life and superior sound quality.',
          price: 199.99,
          discountedPrice: 149.99,
          imageUrl: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          category: 'Electronics',
          rating: 4.7,
          stock: 45,
        }
      },
      {
        productId: '4',
        quantity: 1,
        product: {
          id: '4',
          name: 'Premium Coffee Maker',
          description: 'Start your day right with this programmable coffee maker that brews the perfect cup every time.',
          price: 79.99,
          imageUrl: 'https://images.pexels.com/photos/6312056/pexels-photo-6312056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          category: 'Home & Kitchen',
          rating: 4.3,
          stock: 50,
        }
      }
    ],
    totalAmount: 229.98,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddressId: '1',
    orderDate: '2025-05-10T14:48:00',
    estimatedDelivery: '2025-05-15',
  },
  {
    id: '2',
    userId: '1',
    items: [
      {
        productId: '5',
        quantity: 1,
        product: {
          id: '5',
          name: 'Ergonomic Office Chair',
          description: 'Work in comfort with this adjustable ergonomic chair designed for long hours of sitting.',
          price: 249.99,
          discountedPrice: 199.99,
          imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          category: 'Furniture',
          rating: 4.6,
          stock: 20,
        }
      }
    ],
    totalAmount: 199.99,
    status: 'shipped',
    paymentMethod: 'PayPal',
    shippingAddressId: '2',
    orderDate: '2025-06-01T10:24:00',
    estimatedDelivery: '2025-06-07',
  },
];

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};
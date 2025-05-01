import { Product } from '../types';

// Mock product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 20-hour battery life and superior sound quality.',
    price: 199.99,
    discountedPrice: 149.99,
    imageUrl: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics',
    rating: 4.7,
    stock: 45,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and water resistance.',
    price: 149.99,
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics',
    rating: 4.5,
    stock: 32,
  },
  {
    id: '3',
    name: 'Ultra HD 4K Smart TV - 55"',
    description: 'Immerse yourself in stunning 4K resolution with this smart TV featuring HDR and built-in streaming apps.',
    price: 599.99,
    discountedPrice: 499.99,
    imageUrl: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics',
    rating: 4.8,
    stock: 15,
  },
  {
    id: '4',
    name: 'Premium Coffee Maker',
    description: 'Start your day right with this programmable coffee maker that brews the perfect cup every time.',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/6312056/pexels-photo-6312056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Home & Kitchen',
    rating: 4.3,
    stock: 50,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with this adjustable ergonomic chair designed for long hours of sitting.',
    price: 249.99,
    discountedPrice: 199.99,
    imageUrl: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Furniture',
    rating: 4.6,
    stock: 20,
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    description: 'Convenient wireless charging for all Qi-enabled smartphones and devices.',
    price: 34.99,
    imageUrl: 'https://images.pexels.com/photos/3643761/pexels-photo-3643761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics',
    rating: 4.2,
    stock: 60,
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this waterproof portable speaker with 12 hours of battery life.',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/11132534/pexels-photo-11132534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics',
    rating: 4.4,
    stock: 38,
  },
  {
    id: '8',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 29.99,
    discountedPrice: 24.99,
    imageUrl: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Sports & Outdoors',
    rating: 4.7,
    stock: 75,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
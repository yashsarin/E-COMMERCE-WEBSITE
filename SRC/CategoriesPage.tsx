import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProductCategories } from '../data/products';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading delay
    setTimeout(() => {
      const allCategories = getProductCategories();
      setCategories(allCategories);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Sample images for categories
  const categoryImages: Record<string, string> = {
    'Electronics': 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Home & Kitchen': 'https://images.pexels.com/photos/3623785/pexels-photo-3623785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Furniture': 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'Sports & Outdoors': 'https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/categories/${category}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="relative h-40 md:h-48">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <img
                  src={categoryImages[category] || 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {category}
                  </h2>
                  <div className="bg-white rounded-full p-2">
                    <ArrowRight size={20} className="text-blue-900" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Featured Categories */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Featured Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-900 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Summer Deals</h3>
                <p className="mb-4">Up to 50% off on selected items.</p>
                <Link to="/search?q=summer" className="inline-flex items-center text-white hover:underline">
                  Shop Now
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-teal-500 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">New Arrivals</h3>
                <p className="mb-4">Check out our newest products.</p>
                <Link to="/new-arrivals" className="inline-flex items-center text-white hover:underline">
                  Shop Now
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-red-600 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Clearance</h3>
                <p className="mb-4">Last chance to buy before they're gone.</p>
                <Link to="/clearance" className="inline-flex items-center text-white hover:underline">
                  Shop Now
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
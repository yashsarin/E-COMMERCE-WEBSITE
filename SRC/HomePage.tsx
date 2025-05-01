import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { products, getProductCategories } from '../data/products';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      // Get all featured products (those with discounts)
      const featured = products.filter(product => product.discountedPrice);
      setFeaturedProducts(featured);
      
      // Set all products as new arrivals for now
      // In a real app, these would be filtered by date
      setNewArrivals(products.slice(0, 4));
      
      // Get all categories
      const allCategories = getProductCategories();
      setCategories(allCategories);
      
      setIsLoading(false);
    }, 500);
  }, []);

  // Slideshow images - in a real app these would be separate assets
  const heroImages = [
    'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1546039/pexels-photo-1546039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section with Slideshow */}
      <div className="relative h-[400px] md:h-[500px]">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <img
              src={img}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 flex items-center z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg text-gray-100 mb-8">
                Shop the latest trends and find the perfect items for your lifestyle.
              </p>
              <Link
                to="/categories"
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md inline-flex items-center transition-colors"
              >
                Shop Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slideshow Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/categories/${category}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category}</h3>
                  <p className="text-blue-900 text-sm font-medium">Shop Now</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link to="/categories" className="text-blue-900 hover:text-blue-800 flex items-center">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <Link to="/new-arrivals" className="text-blue-900 hover:text-blue-800 flex items-center">
              View all
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotion Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-blue-900 rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Summer Sale!
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  Up to 50% off on selected items. Limited time offer.
                </p>
                <Link
                  to="/categories"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-md inline-flex items-center self-start transition-colors"
                >
                  Shop the Sale
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Summer Sale" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
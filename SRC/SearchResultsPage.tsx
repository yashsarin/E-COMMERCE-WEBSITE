import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { searchProducts } from '../data/products';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API loading delay
    setTimeout(() => {
      const searchResults = searchProducts(query);
      
      // Apply sorting
      let sortedResults = [...searchResults];
      switch (sortBy) {
        case 'price-low':
          sortedResults.sort((a, b) => {
            const priceA = a.discountedPrice || a.price;
            const priceB = b.discountedPrice || b.price;
            return priceA - priceB;
          });
          break;
        case 'price-high':
          sortedResults.sort((a, b) => {
            const priceA = a.discountedPrice || a.price;
            const priceB = b.discountedPrice || b.price;
            return priceB - priceA;
          });
          break;
        case 'rating':
          sortedResults.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // By default, keep the order (relevance)
          break;
      }
      
      setResults(sortedResults);
      setIsLoading(false);
    }, 500);
  }, [query, sortBy]);
  
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Search Results
          </h1>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <Search size={20} className="text-gray-500 mr-2" />
            <p className="text-gray-700">
              Showing {results.length} results for <span className="font-semibold">"{query}"</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm text-gray-600">$1000</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Electronics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Home & Kitchen</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Furniture</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Sports & Outdoors</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>4 stars & above</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>3 stars & above</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>2 stars & above</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>1 star & above</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800">
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Results - Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center text-gray-700 hover:text-blue-900 mb-4 sm:mb-0"
              >
                <SlidersHorizontal size={20} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
            
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching "{query}". Try different keywords or explore our categories.
                </p>
                <Link to="/categories">
                  <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-md">
                    Browse Categories
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
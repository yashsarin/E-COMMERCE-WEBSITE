import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-md py-2' 
      : 'bg-gradient-to-b from-gray-900 to-transparent py-4'
  }`;

  const textClass = isScrolled ? 'text-gray-900' : 'text-white';
  
  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className={`text-xl font-bold ${textClass}`}>ShopEase</h1>
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-white bg-opacity-90 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                <button type="submit" className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/categories" className={`${textClass} hover:text-blue-600`}>
              Categories
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className={`flex items-center ${textClass} hover:text-blue-600`}
                >
                  <User size={20} className="mr-1" />
                  <span>Account</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link to="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Addresses
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={`${textClass} hover:text-blue-600`}>
                Sign in
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart className={textClass} size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className={textClass} size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button onClick={toggleMenu} className={textClass}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar - Mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-white bg-opacity-90 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <button type="submit" className="absolute right-2 top-2 text-blue-600 hover:text-blue-800">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/categories" className="text-gray-800 hover:text-blue-600 py-2">
                Categories
              </Link>
              
              {user ? (
                <>
                  <div className="border-b border-gray-200 pb-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link to="/profile" className="text-gray-800 hover:text-blue-600 py-2 flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <Link to="/orders" className="text-gray-800 hover:text-blue-600 py-2 flex items-center">
                    <Package size={18} className="mr-2" />
                    Orders
                  </Link>
                  <Link to="/addresses" className="text-gray-800 hover:text-blue-600 py-2 flex items-center">
                    <span className="mr-2">📍</span>
                    Addresses
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 py-2 flex items-center w-full text-left"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-800 hover:text-blue-600 py-2">
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
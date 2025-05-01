import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Truck, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8 mb-8">
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 bg-blue-900 p-3 rounded-full">
              <Truck className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-gray-400 text-sm">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 bg-blue-900 p-3 rounded-full">
              <CreditCard className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-gray-400 text-sm">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="mr-4 bg-blue-900 p-3 rounded-full">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Money-Back Guarantee</h3>
              <p className="text-gray-400 text-sm">30-day return policy</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">ShopEase</h2>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs with the best prices and quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">All Categories</Link></li>
              <li><Link to="/categories/Electronics" className="text-gray-400 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/categories/Home & Kitchen" className="text-gray-400 hover:text-white transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/categories/Furniture" className="text-gray-400 hover:text-white transition-colors">Furniture</Link></li>
              <li><Link to="/categories/Sports & Outdoors" className="text-gray-400 hover:text-white transition-colors">Sports & Outdoors</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-gray-400 mt-1" />
                <span className="text-gray-400">123 Commerce St, San Francisco, CA 94103, USA</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-400">support@shopease.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-semibold text-lg mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new products and special sales</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
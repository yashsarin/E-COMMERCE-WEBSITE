import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Edit, Plus, Trash } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Address } from '../types';
import { useAuth } from '../context/AuthContext';
import { getAddressesByUserId } from '../data/addresses';

const AddressesPage: React.FC = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  
  useEffect(() => {
    if (user?.id) {
      // Simulate API loading delay
      setTimeout(() => {
        const userAddresses = getAddressesByUserId(user.id);
        setAddresses(userAddresses);
        setIsLoading(false);
      }, 500);
    }
  }, [user]);
  
  const handleDeleteAddress = (addressId: string) => {
    // In a real app, this would make an API call
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };
  
  const handleSetDefault = (addressId: string) => {
    // In a real app, this would make an API call
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };
  
  const handleEditAddress = (addressId: string) => {
    setEditingAddressId(addressId);
    setShowAddForm(false);
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Addresses</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {addresses.map(address => (
            <div 
              key={address.id} 
              className={`bg-white rounded-lg shadow-md p-6 ${address.isDefault ? 'border-2 border-blue-900' : ''}`}
            >
              {address.isDefault && (
                <div className="mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    Default Address
                  </span>
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">{address.name}</h3>
                <p className="text-gray-600">{address.street}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-600">{address.country}</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditAddress(address.id)}
                  className="text-gray-600 hover:text-blue-900 flex items-center text-sm"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
                
                {!address.isDefault && (
                  <>
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-gray-600 hover:text-blue-900 flex items-center text-sm"
                    >
                      <MapPin size={16} className="mr-1" />
                      Set as default
                    </button>
                    
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-gray-600 hover:text-red-600 flex items-center text-sm"
                    >
                      <Trash size={16} className="mr-1" />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          
          {/* Add New Address Card */}
          <div 
            className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-900 transition-colors"
            onClick={() => {
              setShowAddForm(true);
              setEditingAddressId(null);
            }}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Plus size={24} className="text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Add New Address</h3>
            <p className="text-gray-600 text-sm">
              Add a new shipping or billing address
            </p>
          </div>
        </div>
        
        {/* Add/Edit Address Form */}
        {(showAddForm || editingAddressId) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Address Name"
                placeholder="Home, Work, etc."
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
              <div className="md:col-span-2 mt-2 flex space-x-4">
                <Button variant="primary">
                  {editingAddressId ? 'Update Address' : 'Add Address'}
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAddressId(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
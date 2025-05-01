import React, { useState } from 'react';
import { User, Phone, Mail, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-900 mr-2">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mb-3">
                    <User size={40} className="text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <Link to="/profile" className="block px-4 py-2 bg-blue-50 text-blue-900 rounded font-medium">
                    Profile Information
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                    Order History
                  </Link>
                  <Link to="/addresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                    Addresses
                  </Link>
                  <Link to="/payment-methods" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
                    Payment Methods
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Profile Information
                </h2>
                
                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-6">
                    <Input
                      label="Full Name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      fullWidth
                      leftIcon={<User size={18} />}
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      fullWidth
                      leftIcon={<Mail size={18} />}
                    />
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      fullWidth
                      leftIcon={<Phone size={18} />}
                    />
                    
                    <div className="flex items-center">
                      <Button
                        type="submit"
                        variant={saveSuccess ? 'secondary' : 'primary'}
                        isLoading={isSaving}
                        leftIcon={saveSuccess ? <Check size={18} /> : <Save size={18} />}
                      >
                        {saveSuccess ? 'Saved!' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Account Security
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Password</h3>
                    <p className="text-gray-600 mb-3">
                      Change your password to keep your account secure.
                    </p>
                    <Button variant="outlined">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-3">
                      Add an extra layer of security to your account.
                    </p>
                    <Button variant="outlined">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// For the check icon when save is successful
const Check = (props: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ProfilePage;
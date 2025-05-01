import { Address } from '../types';

// Mock address data
export const addresses: Address[] = [
  {
    id: '1',
    userId: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    userId: '1',
    name: 'Work',
    street: '456 Market Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    country: 'United States',
    isDefault: false,
  },
];

export const getAddressesByUserId = (userId: string): Address[] => {
  return addresses.filter(address => address.userId === userId);
};

export const getDefaultAddress = (userId: string): Address | undefined => {
  return addresses.find(address => address.userId === userId && address.isDefault);
};
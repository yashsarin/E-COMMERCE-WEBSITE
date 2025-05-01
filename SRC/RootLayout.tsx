import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
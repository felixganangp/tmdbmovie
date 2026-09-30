import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;

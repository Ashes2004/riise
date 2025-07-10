import React from 'react';
import Header from '@/components/universal/Header';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}>
      <Header />
      <div className="flex items-center justify-center h-96">
        <div className="text-white">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
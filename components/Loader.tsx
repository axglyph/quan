
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-2 border-4 border-transparent border-b-purple-500 rounded-full animate-spin-reverse" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>
      <p className="text-blue-400 font-medium animate-pulse tracking-widest text-sm uppercase">Synchronizing Quantum State...</p>
    </div>
  );
};

export default Loader;

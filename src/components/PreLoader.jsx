import React from 'react';

const Preloader = () => {

  return (
    <div className={`fixed inset-0 bg-gray-900 flex justify-center items-center z-50 transition-opacity duration-500`}>
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Preloader;

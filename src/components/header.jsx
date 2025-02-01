import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDropdownStore from '../utils/ZustandStore/useDropDownStore';

export default function Header({ title, icon, links }) {
  const location = useLocation();
  const { linksDropdownOpen, toggleLinksDropdown } = useDropdownStore();

  const currentLink = links?.find((link) => link.linkUrl === location.pathname)?.linkText || links?.[0]?.linkText;

  return (
    <div className="mt-24 w-full max-w-screen-lg mx-auto bg-gray-800 text-white flex items-center justify-between shadow-lg rounded-lg py-4 px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">{title}</h1>


        {links && (
          <div className="md:hidden relative"> 
            <button
              onClick={toggleLinksDropdown}
              className="text-xs sm:text-sm bg-gray-700 text-white px-4 py-2 rounded-lg w-36 text-left hover:bg-gray-600"
            >
              {currentLink}
            </button>
            {linksDropdownOpen && (
              <div className="absolute mt-2 bg-gray-700 rounded-lg shadow-lg w-36 animate-drop-from-top z-10"> 
                {links.map(({ linkText, linkUrl }, index) => (
                  <div key={index}>
                    <Link
                      to={linkUrl}
                      onClick={toggleLinksDropdown} 
                      className="block px-4 py-2 text-xs sm:text-sm text-gray-200 hover:bg-gray-600 hover:text-white"
                    >
                      {linkText}
                    </Link>
                    {index < links.length - 1 && (
                      <div className="border-b border-gray-400 my-1 mx-2"></div> 
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {links && (
          <div className="hidden md:flex space-x-4">
            {links.map(({ linkText, linkUrl }, index) => (
              <Link
                key={index}
                to={linkUrl}
                className={`text-xs sm:text-sm md:text-md ${
                  linkUrl === location.pathname
                    ? 'text-white'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {linkText}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={`flex items-center ${links ? 'hidden sm:block' : ''} text-3xl sm:text-4xl md:text-5xl`}>
        {icon}
      </div>
    </div>
  );
}

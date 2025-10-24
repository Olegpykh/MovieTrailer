import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-900 dark:text-gray-100 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-gray-900 dark:text-gray-100 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

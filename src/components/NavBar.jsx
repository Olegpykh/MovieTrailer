import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white/90 dark:bg-black/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/upcoming"
              className="text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Upcoming
            </Link>
            <Link
              to="/topratedmovies"
              className="text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Top Rated
            </Link>
            <Link
              to="/tvshows"
              className="text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              TV Shows
            </Link>
            <Link
              to="/favorites"
              className="text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

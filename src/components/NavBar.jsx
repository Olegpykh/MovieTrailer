import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-auto shadow-sm bg-white/90 dark:bg-black/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between py-2 sm:h-16 sm:flex-row sm:items-center">
          <div
            className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide sm:space-x-8"
            style={{ gap: '0.75rem' }}
          >
            <Link
              to="/"
              className="text-base font-semibold text-gray-900 transition-colors duration-200 sm:text-xl dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/upcoming"
              className="text-base font-semibold text-gray-900 transition-colors duration-200 sm:text-xl dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Upcoming
            </Link>
            <Link
              to="/topratedmovies"
              className="text-base font-semibold text-gray-900 transition-colors duration-200 sm:text-xl dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Top Rated
            </Link>
            <Link
              to="/tvshows"
              className="text-base font-semibold text-gray-900 transition-colors duration-200 sm:text-xl dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              TV Shows
            </Link>
            <Link
              to="/favorites"
              className="text-base font-semibold text-gray-900 transition-colors duration-200 sm:text-xl dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

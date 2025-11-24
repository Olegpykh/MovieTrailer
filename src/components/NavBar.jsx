import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/features/movies/movieSlice';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white/90 dark:bg-black/80 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:h-16">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link to="/" className="text-sm font-semibold sm:text-base">
              Home
            </Link>
            <Link to="/movies" className="text-sm font-semibold sm:text-base">
              Movies
            </Link>
            <Link to="/series" className="text-sm font-semibold sm:text-base">
              TV Shows
            </Link>
            <Link
              to="/favorites"
              className="text-sm font-semibold sm:text-base"
            >
              Watchlist
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-900 sm:h-7 sm:w-7 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                dispatch(setSearchQuery(e.target.value));
                navigate('/search');
              }}
              className={`ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white 
                          transition-all duration-300 text-sm sm:text-base
                          ${
                            isOpen
                              ? 'w-32 sm:w-64 opacity-100'
                              : 'w-0 opacity-0'
                          } overflow-hidden`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

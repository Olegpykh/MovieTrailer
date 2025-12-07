import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/features/movies/movieSlice';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Switch from 'react-switch';
import { RootState, AppDispatch } from '@/store/store';
import ClerkAuth from '@/auth/ClerkAuth';

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const checked = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleTheme: () => void = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white dark:bg-black dark:text-white backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:h-16">
          <div className="flex items-center">
            <div className="hidden space-x-6 md:flex">
              <Link to="/" className="font-semibold">
                Home
              </Link>
              <Link to="/movies" className="font-semibold">
                Movies
              </Link>
              <Link to="/series" className="font-semibold">
                TV Shows
              </Link>
              <Link to="/favorites" className="font-semibold">
                Watchlist
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Switch
              onChange={handleTheme}
              checked={checked}
              uncheckedIcon={false}
              checkedIcon={false}
              offColor="#ccc"
              onColor="#333"
            />

            <button
              className="p-2 transition"
              onClick={() => {
                if (!isSearchOpen) {
                  dispatch(setSearchQuery(''));
                }
                setIsSearchOpen(!isSearchOpen);
              }}
            >
              <MagnifyingGlassIcon className="text-black h-7 w-7 dark:text-white sm:h-8 sm:w-8" />
            </button>

            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(setSearchQuery(e.target.value));
                  navigate('/search');
                }}
                className={`ml-2 p-2 rounded-xl bg-white text-black 
                            transition-all duration-300 text-sm sm:text-base
                            placeholder:text-gray-400 dark:placeholder:text-gray-300
                            border border-black focus:border-yellow-400
                            ${
                              isSearchOpen
                                ? 'w-32 sm:w-60 opacity-100'
                                : 'w-0 opacity-0'
                            } overflow-hidden`}
              />

              {searchQuery && (
                <button
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="absolute text-gray-500 -translate-y-1/2 right-2 top-1/2 hover:text-black dark:hover:text-white"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <ClerkAuth />
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col p-4 mt-2 space-y-2 bg-white rounded-lg shadow-lg md:hidden dark:bg-black">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-semibold"
            >
              Home
            </Link>
            <Link
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className="font-semibold"
            >
              Movies
            </Link>
            <Link
              to="/series"
              onClick={() => setIsMenuOpen(false)}
              className="font-semibold"
            >
              TV Shows
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className="font-semibold"
            >
              Watchlist
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

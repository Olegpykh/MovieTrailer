import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/features/ui/uiSlice';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Switch from 'react-switch';
import { RootState, AppDispatch } from '@/store/store';
import ClerkAuth from '@/auth/ClerkAuth';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/series', label: 'TV Shows' },
  { to: '/favorites', label: 'Watchlist' },
];

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const checked = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTheme: () => void = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full text-ink dark:text-ivory transition-all duration-500 ease-smooth ${
        isScrolled
          ? 'bg-paper/90 dark:bg-void/90 backdrop-blur-2xl border-b border-ink/10 dark:border-ivory/[0.06]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          <div className="flex items-center gap-12">
            <Link
              to="/"
              className="text-lg font-semibold tracking-[0.1em] uppercase text-ink dark:text-ivory transition-opacity duration-300 hover:opacity-75"
            >
              Stream
              <span className="font-normal text-champagne-dim dark:text-champagne">
                Verse
              </span>
            </Link>

            <div className="items-center hidden gap-9 text-[11px] font-medium tracking-[0.2em] uppercase md:flex">
              {navLinks.map((link) => {
                const isActive =
                  link.to === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative pb-1 transition-colors duration-300 ${
                      isActive
                        ? 'text-ink dark:text-ivory'
                        : 'text-ink/50 dark:text-ivory/50 hover:text-ink dark:hover:text-ivory'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-300 ease-smooth ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 transition-colors text-ink dark:text-ivory"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6 stroke-[1.2]" />
                ) : (
                  <Bars3Icon className="w-6 h-6 stroke-[1.2]" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5 sm:gap-7">
            <div className="flex items-center">
              <Switch
                onChange={handleTheme}
                checked={checked}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor="#E5E2DB"
                onColor="#2A2A2A"
                handleDiameter={16}
                height={20}
                width={40}
              />
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => {
                setIsSearchOpen(false);
                if (!searchQuery) dispatch(setSearchQuery(''));
              }}
            >
              <div className="p-2 transition-colors duration-300 cursor-pointer text-ink/70 dark:text-ivory/60 hover:text-ink dark:hover:text-ivory">
                <MagnifyingGlassIcon className="w-5 h-5 stroke-[1.4]" />
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(setSearchQuery(e.target.value));
                    navigate('/search');
                  }}
                  className={`absolute right-0 py-2 rounded-full 
                     bg-paper dark:bg-surface-2 text-ink dark:text-ivory
                          transition-all duration-500 ease-in-out text-xs
                          placeholder:text-muted font-light
                          border border-ink/15 dark:border-ivory/[0.08] shadow-sm
                          focus:outline-none focus:border-champagne/50 dark:focus:border-champagne/40
                          ${
                            isSearchOpen
                              ? 'w-52 sm:w-64 opacity-100 px-4'
                              : 'w-0 opacity-0 px-0 pointer-events-none border-transparent shadow-none'
                          } overflow-hidden`}
                />

                {isSearchOpen && searchQuery && (
                  <button
                    onClick={() => dispatch(setSearchQuery(''))}
                    className="absolute z-10 transition-colors right-3 text-muted hover:text-ink dark:hover:text-ivory"
                  >
                    <XMarkIcon className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                )}
              </div>
            </div>

            <div className="[&_button]:bg-ink dark:[&_button]:bg-ivory [&_button]:hover:bg-champagne-dim dark:[&_button]:hover:bg-champagne [&_button]:text-paper dark:[&_button]:text-void [&_button]:font-medium [&_button]:px-5 [&_button]:py-2 [&_button]:rounded-full [&_button]:text-[11px] [&_button]:uppercase [&_button]:tracking-[0.15em] [&_button]:transition-all [&_button]:duration-300">
              <ClerkAuth />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col py-5 mt-2 space-y-3 bg-paper/95 dark:bg-void/95 backdrop-blur-2xl border border-ink/10 dark:border-ivory/[0.08] md:hidden px-6 rounded-2xl mb-4 shadow-xl">
            {navLinks.map((link) => {
              const isActive =
                link.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors rounded-lg ${
                    isActive
                      ? 'text-champagne-dim dark:text-champagne'
                      : 'text-ink/60 dark:text-ivory/60 hover:text-ink dark:hover:text-ivory'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

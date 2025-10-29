import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, searchMovies } from '../api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('popular');

  const fetchPopular = async (pageNum) => {
    try {
      setIsLoading(true);
      setError(null);
      const { results, totalPages } = await getPopularMovies(pageNum);
      setMovies((prev) => (pageNum === 1 ? results : [...prev, ...results]));
      setTotalPages(totalPages);
    } catch (err) {
      setError(err.message || 'Failed to load popular movies.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setMode('search');
    setPage(1);
    try {
      setIsLoading(true);
      setError(null);
      const { results, totalPages } = await searchMovies(query, 1);
      setMovies(results);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err.message + query || 'No results found for "' + query + '".');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (mode === 'popular') {
      fetchPopular(page);
    } else if (mode === 'search' && searchQuery.trim()) {
      searchMovies(searchQuery.trim(), page)
        .then(({ results, totalPages }) => {
          setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
          setTotalPages(totalPages);
        })
        .catch(() => {
          setError('Failed to load more results.');
        });
    }
  }, [page, mode, searchQuery]);

  // Сброс поиска при очистке поля (вручную через onChange)
  useEffect(() => {
    if (!searchQuery.trim() && mode === 'search') {
      setMode('popular');
      setPage(1);
      setMovies([]);
      setTotalPages(null);
    }
  }, [searchQuery, mode]);

  return (
    <div className="min-h-screen pt-20 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-10 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
          Movie Explorer
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex flex-col max-w-3xl gap-4 mx-auto mb-12 sm:flex-row"
        >
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-4 text-gray-900 placeholder-gray-400 transition-all duration-300 border border-gray-200 rounded-full shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="px-8 py-4 font-medium text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>

        {/* Состояния */}
        {isLoading && page === 1 ? (
          <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
            {mode === 'search' ? 'Searching...' : 'Loading popular movies...'}
          </p>
        ) : error ? (
          <p className="py-10 text-lg text-center text-red-500 dark:text-red-400">
            {error}
          </p>
        ) : movies.length === 0 ? (
          <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
            {mode === 'search'
              ? 'No movies found for your search.'
              : 'No movies available.'}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {page < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

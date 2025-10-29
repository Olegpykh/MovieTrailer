// src/pages/TopRatedMovies.jsx
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import getTopRatedMovies from '../api/movie/topRated';

export default function TopRatedMovies() {
  const [topMovies, setTopMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopMovies = async (pageNumber) => {
    try {
      setIsLoading(true);
      setError(null);

      const { results, totalPages } = await getTopRatedMovies(pageNumber);
      setTopMovies((prev) => [...prev, ...results]); // ДОБАВЛЯЕМ
      setTotalPages(totalPages);
    } catch (err) {
      const message =
        err.response?.data?.status_message ||
        err.message ||
        'Failed to load top rated movies.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-12 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
          Top Rated Movies
        </h1>

        {error ? (
          <p className="py-10 text-lg text-center text-red-500 dark:text-red-400">
            {error}
          </p>
        ) : topMovies.length === 0 && !isLoading ? (
          <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
            No top rated movies found.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Кнопка "Load more" */}
            {page < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
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

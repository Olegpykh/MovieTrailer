import React, { useState, useEffect } from 'react';
import getPopularTVShows from '../api/movie/tv';
import MovieCard from '../components/MovieCard';

export default function TVPopular() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShows = async (pageNumber) => {
    try {
      setIsLoading(true);
      setError(null);

      const { results, totalPages } = await getPopularTVShows(pageNumber);
      setShows((prev) => [...prev, ...results]);
      setTotalPages(totalPages);
    } catch (err) {
      const message =
        err.response?.data?.status_message ||
        err.message ||
        'Failed to load popular TV shows.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <h1 className="mb-12 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
        Popular TV Shows
      </h1>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {error && (
          <p className="py-10 text-lg text-center text-red-500 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>

        {page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

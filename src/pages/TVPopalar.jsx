import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function TVPopular() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

        const response = await axios.get(
          'https://api.themoviedb.org/3/tv/popular',
          {
            params: {
              api_key: API_KEY,
              language: 'en-US',
              page: 2,
            },
          }
        );

        setShows(response.data.results);
      } catch (err) {
        const message =
          err.response?.data?.status_message ||
          err.message ||
          'Failed to load popular TV shows. Please try again later.';
        setError(message);
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      {/* Заголовок */}
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
        Popular TV Shows
      </h1>

      {/* Контейнер контента */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            Loading popular TV shows...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500 dark:text-red-400 py-10">
            {error}
          </p>
        ) : shows.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            No popular TV shows found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shows.map((show) => (
              <MovieCard key={show.id} movie={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

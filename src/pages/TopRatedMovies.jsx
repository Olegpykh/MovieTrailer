import React, { useState, useEffect } from 'react';
import { getTopRatedMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function TopRatedMovies() {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка топ-фильмов при монтировании
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await getTopRatedMovies();
        setTopMovies(movies);
      } catch (err) {
        setError('Failed to load top rated movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      {/* Заголовок */}
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
        Top Rated Movies
      </h1>

      {/* Контейнер контента */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            Loading top movies...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500 dark:text-red-400 py-10">
            {error}
          </p>
        ) : topMovies.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            No top rated movies found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

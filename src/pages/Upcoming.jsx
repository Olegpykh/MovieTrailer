import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getUpcomingMovies } from '../services/api';

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUpcomingMovies();
        setMovies(data);
      } catch (err) {
        setError('Failed to load upcoming movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
          Upcoming Movies
        </h1>

        {isLoading ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            Loading upcoming movies...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500 dark:text-red-400 py-10">
            {error}
          </p>
        ) : movies.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400 py-10">
            No upcoming movies found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

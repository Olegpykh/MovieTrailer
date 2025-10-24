import React, { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setIsLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      setIsLoading(true);
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 dark:text-white mb-10 tracking-tight">
        Movie Explorer
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 mb-12 px-4 sm:px-6 lg:px-8"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white font-medium px-8 py-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-md"
        >
          Search
        </button>
      </form>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            Loading movies...
          </p>
        ) : error ? (
          <p className="text-center text-lg text-red-500 dark:text-red-400">
            {error}
          </p>
        ) : movies.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            No movies found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .filter((movie) =>
                movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
              )
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <h1 className="text-4xl sm:text-5xl font-semibold text-center text-gray-900 dark:text-white mb-10 tracking-tight">
        Your Favorite Movies
      </h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {favorites === undefined || favorites.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            No favorite movies yet. Add some from the Home page!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

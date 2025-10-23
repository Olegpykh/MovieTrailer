import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const movies = [
    { id: 1, title: 'John Wick', release_date: '2023' },
    { id: 2, title: 'Terminator', release_date: '1999' },
    { id: 3, title: 'Seven', release_date: '1995' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Заголовок */}
      <h1 className="text-5xl font-extrabold text-center text-gray-500 mb-8">
        Movie Explorer
      </h1>

      {/* Форма поиска */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-12"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm bg-white text-gray-900 placeholder-gray-400 transition-all duration-300 hover:shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow"
        >
          Search
        </button>
      </form>

      {/* Сетка фильмов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-2xl shadow-md p-6 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}

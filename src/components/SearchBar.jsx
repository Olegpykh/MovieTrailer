import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/features/movies/movieSlice';

export default function SearchBar({ onSearch }) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-3xl gap-4 mx-auto mb-12 sm:flex-row"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="flex-1 p-4 text-gray-900 placeholder-gray-400 transition-all duration-300 border border-gray-200 rounded-full shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
      />
      <button
        type="submit"
        disabled={!searchQuery.trim()}
        className="px-8 py-4 font-medium text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50"
      >
        Search
      </button>
    </form>
  );
}

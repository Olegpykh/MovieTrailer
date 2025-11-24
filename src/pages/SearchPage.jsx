import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, setError } from '../store/features/movies/movieSlice';

import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api/index';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  const [results, setResults] = useState([]);

  const handleSearch = useCallback(
    async (query) => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const data = await searchMovies(query);
        setResults(data.results || []);
      } catch (err) {
        dispatch(setError(err.message || 'Search failed.'));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  const movies = results.filter(
    (item) => item.media_type === 'movie' && item.poster_path
  );
  const tvShows = results.filter(
    (item) => item.media_type === 'tv' && item.poster_path
  );
  const people = results.filter(
    (item) => item.media_type === 'person' && item.profile_path
  );

  return (
    <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <>
          {movies.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">Movies</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {tvShows.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">TV Shows</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {tvShows.map((tv) => (
                  <MovieCard key={tv.id} movie={tv} />
                ))}
              </div>
            </section>
          )}

          {people.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">People</h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {people.map((person) => (
                  <Link
                    key={person.id}
                    to={`/person/${person.id}`}
                    className="block text-center"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                      alt={person.name}
                      className="mx-auto rounded-lg shadow-md"
                    />
                    <p className="mt-2 text-sm">{person.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

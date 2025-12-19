import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading,
  setError,
  setSearchResults,
} from '../store/features/ui/uiSlice';
import { RootState, AppDispatch } from '@/store/store';
import {
  MovieSearchResult,
  TvSearchResult,
  PersonSearchResult,
  SearchResult,
} from '@/types/tmdb';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../api/index';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const results = useSelector((state: RootState) => state.ui.searchResults);

  const handleSearch = useCallback(
    async (query: string): Promise<void> => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const data = await searchMovies(query);
        dispatch(setSearchResults(data.results));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        } else {
          dispatch(setError('Search failed'));
        }
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

  function isMovie(item: SearchResult): item is MovieSearchResult {
    return item.media_type === 'movie' && !!item.poster_path;
  }

  function isTV(item: SearchResult): item is TvSearchResult {
    return item.media_type === 'tv' && !!item.poster_path;
  }

  function isPerson(item: SearchResult): item is PersonSearchResult {
    return item.media_type === 'person' && !!item.profile_path;
  }

  const movies = results.filter(isMovie);
  const tvShows = results.filter(isTV);
  const people = results.filter(isPerson);

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

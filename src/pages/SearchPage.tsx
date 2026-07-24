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
import { useDocumentTitle } from '@/hooks/useDocumentTitle'; 

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  useDocumentTitle(searchQuery ? `Search: ${searchQuery}` : 'Search');
  const results = useSelector((state: RootState) => state.ui.searchResults);
  const { isLoading, error } = useSelector((state: RootState) => state.ui);

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
    <div className="px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {error && (
        <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
          <span className="text-lg font-medium text-ink dark:text-ivory">
            Something went wrong.
          </span>
          <p className="text-sm text-muted">{error}</p>
        </div>
      )}

      {!error && isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <span className="relative flex w-8 h-8">
            <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
            <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted">
            Searching
          </span>
        </div>
      )}

      {!error && !isLoading && results.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-muted">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : 'Start typing to search.'}
          </p>
        </div>
      )}

      {!error && !isLoading && results.length > 0 && (
        <div className="space-y-16">
          {movies.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-champagne" />
                <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
                  Movies
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {tvShows.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-champagne" />
                <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
                  TV Shows
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {tvShows.map((tv) => (
                  <MovieCard key={tv.id} movie={tv} />
                ))}
              </div>
            </section>
          )}

          {people.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-champagne" />
                <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
                  People
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {people.map((person) => (
                  <Link
                    key={person.id}
                    to={`/person/${person.id}`}
                    className="block text-center transition-opacity group hover:opacity-80"
                  >
                    <div className="overflow-hidden transition-shadow duration-300 rounded-2xl bg-surface ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle group-hover:shadow-lifted">
                      <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                        className="w-full aspect-[2/3] object-cover"
                      />
                    </div>
                    <p className="mt-2.5 text-sm font-medium text-ink dark:text-ivory/90">
                      {person.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

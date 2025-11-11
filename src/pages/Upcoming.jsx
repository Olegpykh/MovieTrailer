import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import { getUpcomingMovies } from '../api';
import {
  setMovies,
  setFeaturedMovies,
  setLoading,
  setError,
  resetPage,
  loadMore,
} from '../store/features/movies/movieSlice';
import ButtonPage from '../components/ButtonPage';

export default function Upcoming() {
  const dispatch = useDispatch();

  const { movies, featuredMovies, page, totalPages, isLoading, error } =
    useSelector((state) => state.movies);

  const fetchUpcoming = useCallback(
    async (pageNum) => {
      if (pageNum > 1) {
        dispatch(setLoading(true));
        dispatch(setError(null));
      }

      try {
        const { results, totalPages: apiTotalPages } = await getUpcomingMovies(
          pageNum
        );

        if (pageNum === 1) {
          const top5 = results.filter((m) => m.backdrop_path).slice(0, 5);
          dispatch(setFeaturedMovies(top5));
        }

        dispatch(
          setMovies({
            results,

            totalPages: apiTotalPages,
            page: pageNum,
          })
        );
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load upcoming movies.'));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  useEffect(() => {
    dispatch(resetPage());

    fetchUpcoming(1);
  }, [dispatch, fetchUpcoming]);

  useEffect(() => {
    if (page > 1) {
      fetchUpcoming(page);
    }
  }, [page, fetchUpcoming]);

  return (
    <>
      {featuredMovies.length > 0 && <HeroBanner items={featuredMovies} />}

      <div
        className={`pt-10 transition-colors duration-300 ${
          featuredMovies.length > 0
            ? 'bg-white/50'
            : 'bg-gray-50 dark:bg-gray-900'
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
            Upcoming Movies
          </h1>

          {error ? (
            <p className="py-10 text-lg text-center text-red-500 dark:text-red-400">
              {error}
            </p>
          ) : (
            <>
              {isLoading && movies.length === 0 ? (
                <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </p>
              ) : movies.length === 0 ? (
                <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
                  No upcoming movies found.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {movies.map((movie, index) => (
                      <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                    ))}
                  </div>

                  {page < totalPages && (
                    <div className="flex justify-center mt-10">
                      <ButtonPage
                        isLoading={isLoading}
                        handleLoadMore={handleLoadMore}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

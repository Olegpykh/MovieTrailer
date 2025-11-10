import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import { getPopularMovies } from '../api/index';
import {
  setMovies,
  setFeaturedMovies,
  setLoading,
  setError,
  loadMore,
  resetPage,
} from '../store/features/movies/movieSlice';
import ButtonPage from '../components/ButtonPage';

export default function Home() {
  const dispatch = useDispatch();

  const { movies, featuredMovies, page, totalPages, isLoading, error } =
    useSelector((state) => state.movies);

  const fetchPopular = useCallback(
    async (pageNum) => {
      if (pageNum > 1) {
        dispatch(setLoading(true));
        dispatch(setError(null));
      }

      try {
        const { results, totalPages: apiTotalPages } = await getPopularMovies(
          pageNum
        );

        if (pageNum === 1) {
          const top5 = results.slice(10, 15).filter((m) => m.backdrop_path);
          dispatch(setFeaturedMovies(top5));
        }

        dispatch(
          setMovies({
            results,
            totalPages: apiTotalPages ?? 1,
            page: pageNum,
          })
        );
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load movies.'));
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
    fetchPopular(1);
  }, [dispatch, fetchPopular]);

  useEffect(() => {
    if (page > 1) {
      fetchPopular(page);
    }
  }, [page, fetchPopular]);

  return (
    <>
      {featuredMovies.length > 0 && <HeroBanner items={featuredMovies} />}

      <div
        className={`pt-20 transition-colors duration-300 ${
          featuredMovies.length > 0
            ? 'bg-white/50'
            : 'bg-gray-50 dark:bg-gray-900'
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-10 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
            Popular Movies
          </h1>

          {error ? (
            <p className="py-10 text-center text-red-500">{error}</p>
          ) : (
            <>
              {isLoading && movies.length === 0 ? (
                <p className="py-10 text-center text-gray-500">Loading...</p>
              ) : movies.length === 0 ? (
                <p className="py-10 text-center text-gray-500">
                  No movies available.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>

                  {page < totalPages && (
                    <div className="flex justify-center mt-12 -mb-6">
                      <ButtonPage isLoading={isLoading} handleLoadMore={handleLoadMore} />
                      {/* <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="px-20 py-4 mb-12 text-xl text-white bg-yellow-500 rounded-full transxlition-colors hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Loading...' : 'Load More'}
                      </button> */}
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

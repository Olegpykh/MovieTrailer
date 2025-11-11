import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import { getPopularTVShows } from '../api/movie/tv';
import {
  setMovies,
  setFeaturedMovies,
  setLoading,
  setError,
  resetPage,
  loadMore,
} from '../store/features/movies/movieSlice';
import ButtonPage from '../components/ButtonPage';

export default function TVPopular() {
  const dispatch = useDispatch();

  const {
    movies: shows,
    featuredMovies: featuredShows,
    page,
    totalPages,
    isLoading,
    error,
  } = useSelector((state) => state.movies);

  const fetchShows = useCallback(
    async (pageNum) => {
      try {
        if (pageNum > 1) {
          dispatch(setLoading(true));
          dispatch(setError(null));
        }

        const { results, totalPages } = await getPopularTVShows(pageNum);

        if (pageNum === 1) {
          const top5 = results.filter((s) => s.backdrop_path).slice(0, 5);
          dispatch(setFeaturedMovies(top5));
        }

        dispatch(
          setMovies({
            results,
            totalPages,
            page: pageNum,
            reset: pageNum === 1,
          })
        );
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load popular TV shows.'));
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
    fetchShows(1);
  }, [dispatch, fetchShows]);

  useEffect(() => {
    if (page > 1) {
      fetchShows(page);
    }
  }, [page, fetchShows]);

  return (
    <>
      {featuredShows.length > 0 && <HeroBanner items={featuredShows} />}

      <div
        className={`pt-10 transition-colors duration-300 ${
          featuredShows.length > 0
            ? 'bg-white/50'
            : 'bg-gray-50 dark:bg-gray-900'
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-12 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white">
            Popular TV Shows
          </h1>

          {error ? (
            <p className="py-10 text-lg text-center text-red-500 dark:text-red-400">
              {error}
            </p>
          ) : (
            <>
              {isLoading && shows.length === 0 ? (
                <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
                  Loading...
                </p>
              ) : shows.length === 0 ? (
                <p className="py-10 text-lg text-center text-gray-500 dark:text-gray-400">
                  No popular TV shows found.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {shows.map((show, index) => (
                      <MovieCard key={`${show.id}-${index}`} movie={show} />
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

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'; 
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTVShows,
  getTvOnTheAir,
} from '../api/index';
import {
  setMovies,
  setUpcomingMovies,
  setFeaturedMovies,
  resetMovieState,
} from '../store/features/movies/movieSlice';
import {
  setPopularTVShows,
  setTvOnTheAir,
  resetTvState,
} from '../store/features/tv/tvSlice';
import { setLoading, setError } from '../store/features/ui/uiSlice';
import CategoryRow from '../components/CategoryRow';
import { RootState, AppDispatch } from '@/store/store';

import {
  loadMorePopularMovies,
  loadMoreUpcomingMovies,
} from '@/api/infiniteScroll/infiniteScrollMovie';
import {
  loadMorePopularTVShows,
  loadMoreTvOnTheAir,
} from '@/api/infiniteScroll/infiniteScrollTv';

export default function Home() {
  useDocumentTitle();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, upcomingMovies, featuredMovies } = useSelector(
    (state: RootState) => state.movies
  );
  const { popularTVShows, tvOnTheAir } = useSelector(
    (state: RootState) => state.tv
  );
  const { isLoading, error } = useSelector((state: RootState) => state.ui);

  const fetchAll = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popularMovies, upcoming, tvShows, tvOnAir] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getPopularTVShows(),
        getTvOnTheAir(),
      ]);

      dispatch(setMovies(popularMovies));
      dispatch(setUpcomingMovies(upcoming));
      dispatch(setPopularTVShows(tvShows));
      dispatch(setTvOnTheAir(tvOnAir));
      dispatch(setFeaturedMovies(popularMovies.slice(0, 8)));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load data.';
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  useEffect(() => {
    dispatch(resetMovieState());
    dispatch(resetTvState());
    fetchAll();
  }, [dispatch, fetchAll]);

  const handleLoadMorePopularMovies = useCallback(() => {
    dispatch(loadMorePopularMovies());
  }, [dispatch]);
  const handleLoadMoreUpcomingMovies = useCallback(() => {
    dispatch(loadMoreUpcomingMovies());
  }, [dispatch]);
  const handleLoadMorePopularTV = useCallback(() => {
    dispatch(loadMorePopularTVShows());
  }, [dispatch]);
  const handleLoadMoreTvOnAir = useCallback(() => {
    dispatch(loadMoreTvOnTheAir());
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-6 text-center">
        <span className="text-lg font-medium text-ink dark:text-ivory">
          Something went wrong.
        </span>
        <p className="text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="relative flex w-8 h-8">
          <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
          <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
        </span>
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted">
          Loading
        </span>
      </div>
    );
  }

  return (
    <>
      {featuredMovies.length > 0 && <HeroBanner items={featuredMovies} />}

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative py-10 my-16">
          <span
            aria-hidden
            className="absolute top-0 left-0 w-5 h-5 border-t border-l border-ink/20 dark:border-ivory/20"
          />
          <span
            aria-hidden
            className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-champagne-dim/50 dark:border-champagne/50"
          />
          <div className="relative flex items-center gap-6 pl-6">
            <span className="hidden sm:block text-[11px] font-medium tracking-[0.3em] uppercase text-champagne/80 [writing-mode:vertical-rl] rotate-180">
              The Programme
            </span>
            <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
              Tonight's picks,{' '}
              <span className="italic font-light text-champagne-dim dark:text-champagne">
                curated for you
              </span>
            </h1>
          </div>
        </div>

        <CategoryRow
          title="Popular Movies"
          items={movies}
          onLoadMore={handleLoadMorePopularMovies}
        />
        <CategoryRow
          title="Upcoming Movies"
          items={upcomingMovies}
          onLoadMore={handleLoadMoreUpcomingMovies}
        />
        <CategoryRow
          title="Popular TV Shows"
          items={popularTVShows}
          onLoadMore={handleLoadMorePopularTV}
        />
        <CategoryRow
          title="On The Air"
          items={tvOnTheAir}
          onLoadMore={handleLoadMoreTvOnAir}
        />
      </div>
    </>
  );
}

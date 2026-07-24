import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'; 
import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieNowPlaying,
} from '../api/index';
import {
  setMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setFeaturedMovies,
  resetMovieState,
} from '../store/features/movies/movieSlice';
import { setLoading, setError } from '../store/features/ui/uiSlice';
import { RootState, AppDispatch } from '@/store/store';
import {
  loadMoreNowPlaingMovies,
  loadMorePopularMovies,
  loadMoreTopRatedMovies,
  loadMoreUpcomingMovies,
} from '@/api/infiniteScroll/infiniteScrollMovie';

export default function MoviePage() {
  useDocumentTitle('Movies');
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    featuredMovies,
  } = useSelector((state: RootState) => state.movies);
  const { isLoading, error } = useSelector((state: RootState) => state.ui);

  const fetchMovies = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popular, upcoming, topRated, nowPlaying] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
        getMovieNowPlaying(),
      ]);

      dispatch(setMovies(popular));
      dispatch(setUpcomingMovies(upcoming));
      dispatch(setTopRatedMovies(topRated));
      dispatch(setNowPlayingMovies(nowPlaying));
      dispatch(setFeaturedMovies(popular.slice(0, 8)));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('Failed to load movies.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  useEffect(() => {
    dispatch(resetMovieState());
    fetchMovies();
  }, [dispatch, fetchMovies]);

  const handleLoadMorePopular = useCallback(() => {
    dispatch(loadMorePopularMovies());
  }, [dispatch]);

  const handleLoadMoreUpcoming = useCallback(() => {
    dispatch(loadMoreUpcomingMovies());
  }, [dispatch]);

  const handleLoadMoreTopRated = useCallback(() => {
    dispatch(loadMoreTopRatedMovies());
  }, [dispatch]);

  const handleLoadMoreNowPlaying = useCallback(() => {
    dispatch(loadMoreNowPlaingMovies());
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
              Movies
            </span>
            <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
              Your gateway{' '}
              <span className="italic font-light text-champagne-dim dark:text-champagne">
                to movies
              </span>
            </h1>
          </div>
        </div>
        <CategoryRow
          title="Popular Movies"
          items={movies}
          onLoadMore={handleLoadMorePopular}
        />
        <CategoryRow
          title="Upcoming Movies"
          items={upcomingMovies}
          onLoadMore={handleLoadMoreUpcoming}
        />
        <CategoryRow
          title="Top Rated Movies"
          items={topRatedMovies}
          onLoadMore={handleLoadMoreTopRated}
        />
        <CategoryRow
          title="Now Playing"
          items={nowPlayingMovies}
          onLoadMore={handleLoadMoreNowPlaying}
        />
      </div>
    </>
  );
}

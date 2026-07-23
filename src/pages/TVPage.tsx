import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import {
  getPopularTVShows,
  getTvOnTheAir,
  getTvAiringToday,
  getTvTopRated,
} from '../api/index';
import {
  setPopularTVShows,
  setTvOnTheAir,
  setTvAiringToday,
  setFeaturedTV,
  setTopRatedTv,
  resetTvState,
} from '../store/features/tv/tvSlice';
import { setLoading, setError } from '../store/features/ui/uiSlice';

import {
  loadMorePopularTVShows,
  loadMoreTvAiringToday,
  loadMoreTopRatedTV,
  loadMoreTvOnTheAir,
} from '@/api/infiniteScroll/infiniteScrollTv';
import { RootState, AppDispatch } from '@/store/store';
import { TV } from 'types/tmdb';

export default function TVPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { popularTVShows, tvOnTheAir, tvAiringToday, topRatedTv, featuredTV } =
    useSelector((state: RootState) => state.tv);
  const { isLoading, error } = useSelector((state: RootState) => state.ui);

  const fetchTV = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popular, onAir, airingToday, topRatedTv] = await Promise.all<TV[]>(
        [
          getPopularTVShows(),
          getTvOnTheAir(),
          getTvAiringToday(),
          getTvTopRated(),
        ]
      );

      dispatch(setPopularTVShows(popular ?? []));
      dispatch(setTvOnTheAir(onAir ?? []));
      dispatch(setTvAiringToday(airingToday ?? []));
      dispatch(setTopRatedTv(topRatedTv ?? []));
      dispatch(setFeaturedTV(popular.slice(0, 8)));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('Failed to load TV shows.'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  useEffect(() => {
    dispatch(resetTvState());
    fetchTV();
  }, [dispatch, fetchTV]);

  const handleLoadMorePopular = useCallback(() => {
    dispatch(loadMorePopularTVShows());
  }, [dispatch]);
  const handleLoadMoreOnAir = useCallback(() => {
    dispatch(loadMoreTvOnTheAir());
  }, [dispatch]);
  const handleLoadMoreAiringToday = useCallback(() => {
    dispatch(loadMoreTvAiringToday());
  }, [dispatch]);
  const handleLoadMoreTopRated = useCallback(() => {
    dispatch(loadMoreTopRatedTV());
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
      {featuredTV.length > 0 && <HeroBanner items={featuredTV} />}
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
              TV Shows
            </span>
            <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
              Stream the stories{' '}
              <span className="italic font-light text-champagne-dim dark:text-champagne">
                you love
              </span>
            </h1>
          </div>
        </div>
        <CategoryRow
          title="Popular TV Shows"
          items={popularTVShows}
          onLoadMore={handleLoadMorePopular}
        />
        <CategoryRow
          title="On The Air"
          items={tvOnTheAir}
          onLoadMore={handleLoadMoreOnAir}
        />
        <CategoryRow
          title="Airing Today"
          items={tvAiringToday}
          onLoadMore={handleLoadMoreAiringToday}
        />
        <CategoryRow
          title="Top Rated"
          items={topRatedTv}
          onLoadMore={handleLoadMoreTopRated}
        />
      </div>
    </>
  );
}

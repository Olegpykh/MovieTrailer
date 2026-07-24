import { useEffect, useState, useCallback, useRef } from 'react';
import { getTrending, TimeWindow } from '../api/trending/trending';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'; 
import { MovieSearchResult, TvSearchResult, SearchResult } from '@/types/tmdb';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';

function isMovie(item: SearchResult): item is MovieSearchResult {
  return item.media_type === 'movie' && !!item.poster_path;
}

function isTV(item: SearchResult): item is TvSearchResult {
  return item.media_type === 'tv' && !!item.poster_path;
}

export default function TrendingPage() {
  useDocumentTitle('Trending');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedOnce = useRef(false);

  const fetchTrending = useCallback(async (window: TimeWindow) => {
    if (hasFetchedOnce.current) {
      setIsSwitching(true);
    } else {
      setIsInitialLoading(true);
    }
    setError(null);

    try {
      const data = await getTrending(window, 1);
      setResults(data.results);
      setTotalPages(data.totalPages);
      setPage(1);
    } catch (err) {
      setError('Failed to load trending titles.');
    } finally {
      setIsInitialLoading(false);
      setIsSwitching(false);
      hasFetchedOnce.current = true;
    }
  }, []);

  useEffect(() => {
    fetchTrending(timeWindow);
  }, [timeWindow, fetchTrending]);

  const handleLoadMore = useCallback(async () => {
    if (page >= totalPages || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;
      const data = await getTrending(timeWindow, nextPage);
      setResults((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more titles.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, totalPages, timeWindow, isLoadingMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleLoadMore]);

  const items = results.filter((item) => isMovie(item) || isTV(item)) as (
    | MovieSearchResult
    | TvSearchResult
  )[];

  const featured = items.filter((item) => item.backdrop_path).slice(0, 8);

  if (isInitialLoading) {
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

  return (
    <>
      {featured.length > 0 && <HeroBanner items={featured} />}

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
          <div className="relative flex flex-col gap-6 pl-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <span className="hidden sm:block text-[11px] font-medium tracking-[0.3em] uppercase text-champagne/80 [writing-mode:vertical-rl] rotate-180">
                Trending
              </span>
              <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
                What everyone's{' '}
                <span className="italic font-light text-champagne-dim dark:text-champagne">
                  watching
                </span>
              </h1>
            </div>

            <div className="inline-flex p-1 rounded-full bg-ink/5 dark:bg-ivory/10 w-fit">
              {(['day', 'week'] as TimeWindow[]).map((window) => (
                <button
                  key={window}
                  onClick={() => setTimeWindow(window)}
                  className={`px-4 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-all duration-300 ${
                    timeWindow === window
                      ? 'bg-ink dark:bg-ivory text-paper dark:text-void'
                      : 'text-ink/50 dark:text-ivory/50 hover:text-ink dark:hover:text-ivory'
                  }`}
                >
                  {window === 'day' ? 'Today' : 'This Week'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <CategoryRow
          title={timeWindow === 'day' ? 'Trending Today' : 'Trending This Week'}
          items={items.slice(0, 20)}
          onLoadMore={() => {}}
        />

        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-[2px] bg-champagne" />
          <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory">
            Browse All
          </h2>
        </div>

        <div
          className={`transition-opacity duration-300 ${
            isSwitching ? 'opacity-40' : 'opacity-100'
          }`}
        >
          <div className="grid grid-cols-2 pb-10 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {items.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
            ))}
          </div>
        </div>

        <div ref={sentinelRef} className="h-px" />

        {isLoadingMore && (
          <div className="flex justify-center pb-16">
            <span className="relative flex w-6 h-6">
              <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
              <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
            </span>
          </div>
        )}

        {!isLoadingMore && <div className="pb-20" />}
      </div>
    </>
  );
}

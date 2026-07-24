import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieGenres, getTvGenres } from '../api/genres/genres';
import { discoverMovies } from '../api/discover/discoverMovie';
import { discoverTv } from '../api/discover/discoverTv';
import { SortOption } from '../api/discover/discoverMovie';
import { Genres, Movie, TV } from '@/types/tmdb';
import MovieCard from '../components/MovieCard';

type MediaType = 'movie' | 'tv';

const SORT_LABELS: Record<SortOption, string> = {
  popular: 'Popular',
  top_rated: 'Top Rated',
  newest: 'Newest',
};

export default function DiscoverPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = (searchParams.get('type') as MediaType) || 'movie';
  const genreParam = searchParams.get('genre');
  const selectedGenre = genreParam ? Number(genreParam) : null;
  const sort = (searchParams.get('sort') as SortOption) || 'popular';

  const [genres, setGenres] = useState<Genres[]>([]);
  const [items, setItems] = useState<(Movie | TV)[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    const fetchGenres = async () => {
      const list =
        type === 'movie' ? await getMovieGenres() : await getTvGenres();
      setGenres(list);
    };
    fetchGenres();
  }, [type]);

  const fetchResults = useCallback(
    async (
      mediaType: MediaType,
      genreId: number | null,
      sortOption: SortOption
    ) => {
      if (hasFetchedOnce.current) {
        setIsSwitching(true);
      } else {
        setIsInitialLoading(true);
      }
      setError(null);

      try {
        const data =
          mediaType === 'movie'
            ? await discoverMovies({ genreId, sort: sortOption, page: 1 })
            : await discoverTv({ genreId, sort: sortOption, page: 1 });

        setItems(data.results.filter((item) => item.poster_path));
        setTotalPages(data.totalPages);
        setPage(1);
      } catch (err) {
        setError('Failed to load titles.');
      } finally {
        setIsInitialLoading(false);
        setIsSwitching(false);
        hasFetchedOnce.current = true;
      }
    },
    []
  );

  useEffect(() => {
    fetchResults(type, selectedGenre, sort);
  }, [type, selectedGenre, sort, fetchResults]);

  const handleLoadMore = useCallback(async () => {
    if (page >= totalPages || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;
      const data =
        type === 'movie'
          ? await discoverMovies({
              genreId: selectedGenre,
              sort,
              page: nextPage,
            })
          : await discoverTv({ genreId: selectedGenre, sort, page: nextPage });

      setItems((prev) => [
        ...prev,
        ...data.results.filter((item) => item.poster_path),
      ]);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more titles.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, totalPages, isLoadingMore, type, selectedGenre, sort]);

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

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  const handleTypeChange = (newType: MediaType) => {
    updateParams({ type: newType, genre: null });
  };

  const handleGenreClick = (genreId: number) => {
    updateParams({ genre: selectedGenre === genreId ? null : String(genreId) });
  };

  const handleSortChange = (newSort: SortOption) => {
    updateParams({ sort: newSort === 'popular' ? null : newSort });
  };

  return (
    <div className="px-4 pt-32 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative py-10 mb-12">
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
            Discover
          </span>
          <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
            Find your{' '}
            <span className="italic font-light text-champagne-dim dark:text-champagne">
              next favorite
            </span>
          </h1>
        </div>
      </div>

      <div className="inline-flex p-1 mb-6 rounded-full bg-ink/5 dark:bg-ivory/10 w-fit">
        {(['movie', 'tv'] as MediaType[]).map((option) => (
          <button
            key={option}
            onClick={() => handleTypeChange(option)}
            className={`px-4 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-all duration-300 ${
              type === option
                ? 'bg-ink dark:bg-ivory text-paper dark:text-void'
                : 'text-ink/50 dark:text-ivory/50 hover:text-ink dark:hover:text-ivory'
            }`}
          >
            {option === 'movie' ? 'Movies' : 'TV Shows'}
          </button>
        ))}
      </div>

      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                selectedGenre === genre.id
                  ? 'bg-champagne text-void'
                  : 'bg-ink/5 dark:bg-ivory/10 text-ink/70 dark:text-ivory/70 hover:bg-ink/10 dark:hover:bg-ivory/15'
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 pb-10 mb-2 border-b border-ink/10 dark:border-ivory/10">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
          Sort
        </span>
        <div className="flex gap-1">
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => handleSortChange(option)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                sort === option
                  ? 'text-champagne-dim dark:text-champagne'
                  : 'text-ink/50 dark:text-ivory/50 hover:text-ink dark:hover:text-ivory'
              }`}
            >
              {SORT_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      {isInitialLoading && (
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <span className="relative flex w-8 h-8">
            <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
            <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted">
            Loading
          </span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
          <span className="text-lg font-medium text-ink dark:text-ivory">
            Something went wrong.
          </span>
          <p className="text-sm text-muted">{error}</p>
        </div>
      )}

      {!isInitialLoading && !error && items.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-muted">No titles match these filters.</p>
        </div>
      )}

      {!isInitialLoading && !error && items.length > 0 && (
        <>
          <div
            className={`transition-opacity duration-300 ${
              isSwitching ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {items.map((item) => (
                <MovieCard key={`${type}-${item.id}`} movie={item} />
              ))}
            </div>
          </div>

          <div ref={sentinelRef} className="h-px mt-10" />

          {isLoadingMore && (
            <div className="flex justify-center pb-4">
              <span className="relative flex w-6 h-6">
                <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
                <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

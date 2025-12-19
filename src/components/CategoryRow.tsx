import { useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Movie, TV } from 'types/tmdb';

type CategoryRowProps = {
  title: string;
  items: (Movie | TV)[];
  onLoadMore: () => void;
};

export default function CategoryRow({
  title,
  items = [],
  onLoadMore,
}: CategoryRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  if (!items || items.length === 0) return null;
  const scroll = (direction: 'right' | 'left'): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.6;

    const targetScroll =
      direction === 'right'
        ? container.scrollLeft + scrollAmount
        : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { clientWidth, scrollLeft, scrollWidth } = container;
      const isEndOfContainer = clientWidth + scrollLeft >= scrollWidth - 50;

      if (isEndOfContainer) {
        onLoadMore();
      }
    };
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [onLoadMore]);

  return (
    <section className="mb-12 group/category">
      <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-20 flex items-center justify-center w-12 h-12 text-black transition-all duration-300 -translate-y-1/2 rounded-full shadow-xl opacity-0 dark:text-white top-1/2 bg-white/70 dark:bg-black/70 backdrop-blur-md group-hover/category:opacity-100 hover:bg-white/90 dark:hover:bg-black/90 md:opacity-100 lg:opacity-0 lg:group-hover/category:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-7 h-7" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-20 flex items-center justify-center w-12 h-12 text-black transition-all duration-300 -translate-y-1/2 rounded-full shadow-xl opacity-0 dark:text-white top-1/2 bg-white/70 dark:bg-black/70 backdrop-blur-md group-hover/category:opacity-100 hover:bg-white/90 dark:hover:bg-black/90 md:opacity-100 lg:opacity-0 lg:group-hover/category:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-7 h-7" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-auto scrollbar-hide"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-32 transition-all duration-300 sm:w-36 md:w-40 lg:w-48"
            >
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

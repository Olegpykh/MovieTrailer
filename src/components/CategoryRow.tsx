import { useEffect, useRef, useState } from 'react';
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

  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { clientWidth, scrollLeft, scrollWidth } = container;

      setIsAtStart(scrollLeft === 0);

      const isEndOfContainer = clientWidth + scrollLeft >= scrollWidth - 50;

      if (isEndOfContainer) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [onLoadMore]);

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

  return (
    <section className="mb-14 group/category">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-[2px] bg-champagne" />
        <h2 className="text-xl font-semibold tracking-wide text-ink dark:text-ivory sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className={`
                          hidden md:flex
                          absolute left-0 top-1/2 -translate-y-1/2 z-20
                          w-11 h-11 items-center justify-center rounded-full shadow-xl
                          bg-paper/80 dark:bg-void/80 text-ink dark:text-ivory
                          ring-1 ring-champagne/40 backdrop-blur-md transition-all duration-300
                          hover:text-champagne

                          ${
                            isAtStart
                              ? 'opacity-0 pointer-events-none'
                              : 'opacity-0 group-hover/category:opacity-100'
                          }
                        `}
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className={`
                        hidden md:flex
                        absolute right-0 top-1/2 -translate-y-1/2 z-20
                        w-11 h-11 items-center justify-center rounded-full shadow-xl
                        bg-paper/80 dark:bg-void/80 text-ink dark:text-ivory
                        ring-1 ring-champagne/40 backdrop-blur-md transition-all duration-300
                        hover:text-champagne

                        opacity-0
                        group-hover/category:opacity-100
                      `}
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-auto reel-scroll scrollbar-hide"
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

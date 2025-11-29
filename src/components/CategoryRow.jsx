
import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function CategoryRow({ title, items = [] }) {
  const scrollContainerRef = useRef(null);

  if (!items || items.length === 0) return null;

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.6;
    const targetScroll =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

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
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 transition-all duration-300 md:w-40 sm:w-36 xs:w-32"
            >
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

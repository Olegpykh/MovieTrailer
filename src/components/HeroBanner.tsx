import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { Movie, TV } from '@/types/tmdb';

type HeroBannerProps = {
  items: (Movie | TV)[];
};

export default function HeroBanner({ items = [] }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % items.length),
    [items.length]
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + items.length) % items.length),
    [items.length]
  );
  const goToSlide = useCallback((i: number) => setCurrentSlide(i), []);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  const movie: Movie | TV = items[currentSlide];

  const title = movie.title || movie.name || 'Unknown';
  const dateStr = movie.release_date ?? movie.first_air_date;
  const year = dateStr ? new Date(dateStr).getFullYear() : 'N/A';

  const rating = movie.vote_average?.toFixed(1) ?? 'N/A';
  const overview = movie.overview || 'No description.';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-paper dark:bg-void">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-smooth ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
            alt={title}
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent dark:from-void dark:via-void/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/10 dark:from-void dark:to-void/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl pl-6 pr-8 space-y-4 sm:pl-12 lg:pl-20">
              <span className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-muted">
                Now Streaming
              </span>
              <h1 className="text-4xl font-semibold leading-[1.1] text-ink dark:text-ivory sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-ink/70 dark:text-ivory/70">
                <span className="flex items-center gap-1.5 text-champagne-dim dark:text-champagne">
                  <FaStar className="text-xs" />
                  {rating}
                </span>
                <span className="text-muted">·</span>
                <span>{year}</span>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-ink/60 dark:text-ivory/60 line-clamp-3">
                {overview}
              </p>
            </div>
          </div>
        </div>
      ))}

      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute z-10 hidden p-3 transition-colors -translate-y-1/2 border rounded-full sm:flex left-4 top-1/2 text-ink dark:text-ivory bg-paper/60 dark:bg-surface/50 backdrop-blur-sm border-ink/10 dark:border-ivory/10 hover:border-champagne hover:text-champagne-dim dark:hover:text-champagne"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute z-10 hidden p-3 transition-colors -translate-y-1/2 border rounded-full sm:flex right-4 top-1/2 text-ink dark:text-ivory bg-paper/60 dark:bg-surface/50 backdrop-blur-sm border-ink/10 dark:border-ivory/10 hover:border-champagne hover:text-champagne-dim dark:hover:text-champagne"
          >
            <FaChevronRight className="text-lg" />
          </button>
          <div className="absolute z-10 flex gap-2 -translate-x-1/2 bottom-10 left-1/2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-smooth ${
                  i === currentSlide
                    ? 'bg-champagne w-6'
                    : 'bg-ink/20 dark:bg-ivory/25 w-1.5 hover:bg-ink/35 dark:hover:bg-ivory/40'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* quiet 1px divider into the page below, instead of a decorative strip */}
      <div className="absolute bottom-0 left-0 z-10 w-full h-px bg-ink/10 dark:bg-ivory/10" />
    </div>
  );
}

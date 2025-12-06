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
    <div className="relative w-screen h-screen overflow-hidden">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
            alt={title}
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-3xl pl-6 pr-8 space-y-5 text-white sm:pl-12 lg:pl-20">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-lg">
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  {rating}
                </span>
                <span className="text-gray-300">•</span>
                <span>{year}</span>
              </div>
              <p className="max-w-xl text-lg text-gray-200 line-clamp-4">
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
            className="absolute z-10 p-3 text-white -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute z-10 p-3 text-white -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40"
          >
            <FaChevronRight className="text-2xl" />
          </button>
          <div className="absolute z-10 flex gap-2 -translate-x-1/2 bottom-8 left-1/2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

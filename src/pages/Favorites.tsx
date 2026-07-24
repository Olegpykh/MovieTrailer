import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import { RootState } from '../store/store';
import { useDocumentTitle } from '@/hooks/useDocumentTitle'; 

export default function Favorites() {
  useDocumentTitle('Watchlist');
  const favorites = useSelector((state: RootState) => state.favorites);

  const featuredFavorites = favorites
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  const hasMovies = favorites.length > 0;

  return (
    <>
      {featuredFavorites.length > 0 && <HeroBanner items={featuredFavorites} />}

      <div
        className={`transition-colors duration-300 bg-paper dark:bg-void ${
          featuredFavorites.length === 0 ? 'pt-32' : 'pt-10'
        }`}
      >
        <div className="px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                Watchlist
              </span>
              <h1 className="text-4xl font-medium leading-[1.05] text-ink/90 dark:text-ivory/90 sm:text-5xl lg:text-6xl -tracking-tight">
                Saved{' '}
                <span className="italic font-light text-champagne-dim dark:text-champagne">
                  for you
                </span>
              </h1>
            </div>
          </div>

          {hasMovies ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-surface ring-1 ring-ink/10 dark:ring-ivory/10" />
              <p className="mb-6 text-base text-ink/60 dark:text-ivory/60">
                No favorites yet. Start adding from the Home page.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 text-sm font-medium transition-all rounded-full bg-ink dark:bg-ivory text-paper dark:text-void hover:opacity-90"
              >
                Go to Home Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

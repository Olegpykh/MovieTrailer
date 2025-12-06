import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import HeroBanner from '../components/HeroBanner';
import { RootState } from '../store/store';
export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites);

  const featuredFavorites = favorites
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  const hasMovies = favorites.length > 0;

  return (
    <>
      {featuredFavorites.length > 0 && <HeroBanner items={featuredFavorites} />}

      <div
        className={`pt-10 transition-colors duration-300 ${
          featuredFavorites.length > 0
            ? 'bg-white/20  dark:bg-black'
            : 'bg-white/20 dark:bg-black'
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mt-12 mb-12 text-4xl font-semibold tracking-tight text-center text-gray-900 sm:text-5xl dark:text-white ">
            Saved for You
          </h1>
          {hasMovies ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center ">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 border-2 border-dashed rounded-xl dark:bg-gray-700" />
              <p className="mb-6 text-lg text-black dark:text-white ">
                No favorite movies yet. Start adding from the Home page!
              </p>
              <Link
                to={'/'}
                className="inline-block px-8 py-3.5 text-lg font-medium text-black dark:text-white transition-all bg-yellow-400 rounded-full hover:bg-yellow-500 hover:scale-105 shadow-lg"
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

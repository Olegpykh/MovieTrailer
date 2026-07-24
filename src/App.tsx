import { Suspense, lazy } from 'react';
import NavBar from '@/components/NavBar';
import { Routes, Route } from 'react-router-dom';

const Favorites = lazy(() => import('@/pages/Favorites'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const MoviePage = lazy(() => import('@/pages/MoviePage'));
const TVPage = lazy(() => import('@/pages/TVPage'));
const TrendingPage = lazy(() => import('@/pages/TrendingPage'));
const DiscoverPage = lazy(() => import('@/pages/DiscoverPage'));
const PersonPage = lazy(() => import('@/pages/PersonPage'));
const MovieDetails = lazy(() => import('@/pages/MovieDetails'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function RouteFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <span className="relative flex w-8 h-8">
        <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
        <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
      </span>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-void dark:text-ivory">
      <NavBar />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/series" element={<TVPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/person/:id" element={<PersonPage />} />
          <Route path="/:type/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

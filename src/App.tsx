import NavBar from '@/components/NavBar';
import Favorites from '@/pages/Favorites';
import HomePage from '@/pages/HomePage';
import MoviePage from '@/pages/MoviePage';
import TVPage from '@/pages/TVPage';
import TrendingPage from '@/pages/TrendingPage';
import DiscoverPage from '@/pages/DiscoverPage';
import PersonPage from '@/pages/PersonPage';
import MovieDetails from '@/pages/MovieDetails';
import SearchPage from '@/pages/SearchPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-void dark:text-ivory">
      <NavBar />
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
      </Routes>
    </div>
  );
}

export default App;

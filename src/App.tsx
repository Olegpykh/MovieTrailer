import NavBar from '@/components/NavBar';
import Favorites from '@/pages/Favorites';
import HomePage from '@/pages/HomePage';
import MoviePage from '@/pages/MoviePage';
import TVPage from '@/pages/TVPage';
import PersonPage from '@/pages/PersonPage';
import MovieDetails from '@/pages/MovieDetails';
import SearchPage from '@/pages/SearchPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white ">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/series" element={<TVPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;

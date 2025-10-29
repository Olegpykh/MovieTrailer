import './App.css';
import NavBar from './components/NavBar.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import TopRatedMovies from './pages/TopRatedMovies.jsx';
import Upcoming from './pages/Upcoming.jsx';
import TVPopular from './pages/TVPopular.jsx';

import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesProvider.jsx';

function App() {
  return (
    <FavoritesProvider>
      <NavBar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/topratedmovies" element={<TopRatedMovies />} />
          <Route path="/tvshows" element={<TVPopular />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}

export default App;

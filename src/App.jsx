import NavBar from './components/NavBar.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import TopRatedMovies from './pages/TopRatedMovies.jsx';
import Upcoming from './pages/Upcoming.jsx';
import TVPopular from './pages/TVPopular.jsx';
import PersonPage from './pages/PersonPage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/topratedmovies" element={<TopRatedMovies />} />
        <Route path="/tvshows" element={<TVPopular />} />
        <Route path="/person/:id" element={<PersonPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;

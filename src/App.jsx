import NavBar from './components/NavBar.jsx';
import Favorites from './pages/Favorites.jsx';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import TVPage from './pages/TVPage.jsx';
import PersonPage from './pages/PersonPage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import SearchPage from './pages/SearchPage.jsx';
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

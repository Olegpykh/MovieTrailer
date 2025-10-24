import './App.css';
import NavBar from './components/NavBar.jsx';
import Favorites from './pages/Favorites.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

function App() {
  return (
    <FavoritesProvider>
      <NavBar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}

export default App;

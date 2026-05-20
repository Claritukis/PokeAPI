import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/PaginaInicio';
import DetailPage from './pages/DetallePokemon';
import FavoritosPage from './pages/PaginaFavoritos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:nombre" element={<DetailPage />} />
        <Route path="/favoritos" element={<FavoritosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
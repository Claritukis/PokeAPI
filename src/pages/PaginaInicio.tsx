import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { pokemon } from '../types/pokemon';
import { ObtenerListaPokemones, ObtenerDetallePokemon } from '../services/API';
import Buscador from '../components/BuscarPokemon';
import FiltroTipos from '../components/FiltrosPokemon';
import CartaPokemon from '../components/CartaPokemon';
import '../index.css';

function HomePage() {
  const [pokemones, setPokemones] = useState<pokemon[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarPokemones = async () => {
      try {
        setCargando(true);
        const lista = await ObtenerListaPokemones(30);
        const detalles = await Promise.all(
          lista.map((p: any) => ObtenerDetallePokemon(p.name))
        );
        setPokemones(detalles);
        console.log('Pokemones cargados:', detalles.length);
      } catch (err) {
        console.log('Error al cargar:', err);
        setError('Error al cargar pokemones');
      } finally {
        setCargando(false);
      }
    };

    cargarPokemones();
  }, []);

  // FILTROS
  const pokemonesFiltrados = pokemones.filter((pokemon) => {
    const coincideNombre = pokemon.name.toLowerCase().includes(busqueda.toLowerCase());
    const coincideTipo = tipo === '' || pokemon.types.some((t) => t.type.name === tipo);
    return coincideNombre && coincideTipo;
  });

  if (cargando) {
    return <h1>Cargando pokemones...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Paginukis de Pokédex</h1>

      <div className="contenedor-filtros">
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
        <FiltroTipos tipo={tipo} setTipo={setTipo} />
        <Link to="/favoritos">
          <button>Ver Favoritos</button>
        </Link>
        <Link to="/comparar">
          <button>Comparar Pokemones</button>
        </Link>
      </div>

      {pokemonesFiltrados.length === 0 && <h2>No se encontraron pokemones</h2>}

      <div className="contenedor-cartas">
        {pokemonesFiltrados.map((pokemon) => (
          <CartaPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
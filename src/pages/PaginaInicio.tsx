import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DetallePokemon } from '../types/pokemon';
import { ObtenerListaPokemones, ObtenerDetallePokemon } from '../services/API';
import Buscador from '../components/BuscarPokemon';
import FiltroTipos from '../components/FiltrosPokemon';
import CartaPokemon from '../components/CartaPokemon';
import '../index.css';

function HomePage() {

  // Guardar pokemones
  const [pokemones, setPokemones] = useState<DetallePokemon[]>([]);

  // Guardar texto de busqueda
  const [busqueda, setBusqueda] = useState('');

  // Guardar tipo seleccionado
  const [tipo, setTipo] = useState('');

  // Estado de carga
  const [cargando, setCargando] = useState(true);

  // Estado de error
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarPokemones = async () => {

      try {
        setCargando(true);
        // Obtener lista
        const lista = await ObtenerListaPokemones(100);

        // Obtener detalles
        const detalles = await Promise.all(lista.map((pokemon) => ObtenerDetallePokemon(pokemon.nombre)));

        // Guardar datos
        setPokemones(detalles);

      } catch (err) {
        setError('Error al cargar pokemones');

      } finally {
        setCargando(false);

      }
    };

    cargarPokemones();

  }, []);

  // Filtrar pokemones
  const pokemonesFiltrados =
    pokemones.filter((pokemon) => {
      // Buscar por nombre
      const coincideNombre = pokemon.nombre.toLowerCase().includes(busqueda.toLowerCase());

      // Buscar por tipo
      const coincideTipo =
        tipo === '' || pokemon.tipos.some((t) => t.nombre === tipo);

      return (coincideNombre && coincideTipo);
    });

  // Mensaje de carga
  if (cargando) {
    return <h1>Cargando pokemones...</h1>;
  }

  // Mensaje de error
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Paginukis de Pokédex</h1>

      <div className="contenedor-filtros">
        {/* Busqueda */}
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />

        {/* Filtro */}
        <FiltroTipos tipo={tipo} setTipo={setTipo} />

        {/* Favoritos */}
        <Link to="/favoritos"><button>Ver Favoritos</button></Link>
      </div>

      {/* Sin resultados */}
      {pokemonesFiltrados.length === 0 && (<h2> No se encontraron pokemones</h2> )}

      {/* Cartas */}
      <div className="contenedor-cartas">
        {pokemonesFiltrados.map((pokemon) => (<CartaPokemon key={pokemon.id} pokemon={pokemon} />))}
      </div>

    </div>
  );
}

export default HomePage;
import { useEffect, useState } from 'react';
import type { DetallePokemon } from '../types/pokemon';
import { ObtenerListaPokemones, ObtenerDetallePokemon } from '../services/API';
import PokemonCard from '../components/PokemonCard';

function HomePage() {
  const [pokemones, setPokemones] = useState<DetallePokemon[]>([]);

  useEffect(() => {
    const cargarPokemones = async () => {
      const lista = await ObtenerListaPokemones(20);
      const detalles = await Promise.all(
        lista.map((pokemon) => ObtenerDetallePokemon(pokemon.nombre))
      );

      setPokemones(detalles);
    };

    cargarPokemones();

  }, []);

  return (
    <div className="contenedor">
      <h1 className="titulo">Paginukis de Pokédex</h1>
      <div className="contenedor-cartas">
        {pokemones.map((pokemon) => (<PokemonCard key={pokemon.id} pokemon={pokemon}/> ))}
      </div>
    </div>
  );
}

export default HomePage;
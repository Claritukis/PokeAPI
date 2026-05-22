import { useEffect, useState } from 'react';
import type { pokemon } from '../types/pokemon';
import { ObtenerDetallePokemon } from '../services/API';
import UsarFavoritos from '../hooks/UsarFavoritos';
import CartaPokemon from '../components/CartaPokemon';
import { useNavigate } from 'react-router-dom';

export default function FavoritosPage() {
  const { favoritos } = UsarFavoritos();
  const navegar = useNavigate();
  const [pokemones, setPokemones] = useState<pokemon[]>([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      const detalles = await Promise.all(
        favoritos.map((nombre) => ObtenerDetallePokemon(nombre))
      );
      setPokemones(detalles);
      console.log('Favoritos cargados:', detalles.length);
    };
    cargarFavoritos();
  }, [favoritos]);

  return (
    <div className="contenedor">
      <h1 className="titulo">Pokemones Favoritos</h1>
      <button onClick={() => navegar(-1)} className="boton-volver">Regresar</button>

      {pokemones.length === 0 && <p>No tienes favoritos</p>}

      <div className="contenedor-cartas">
        {pokemones.map((pokemon) => (
          <CartaPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
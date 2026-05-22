import type { pokemon } from '../types/pokemon';
import CartaPokemon from './CartaPokemon';

type Props = {
  favoritos: string[];
  todosPokemones: pokemon[];
};

function FavoritosPokemon({ favoritos, todosPokemones }: Props) {
  const listaFavoritos = todosPokemones.filter(p => favoritos.includes(p.name));

  return (
    <div className="grid-container">
      {listaFavoritos.map((p) => (
        <CartaPokemon key={p.name} pokemon={p} />
      ))}
      {listaFavoritos.length === 0 && <p>No tienes favoritos aún.</p>}
    </div>
  );
}

export default FavoritosPokemon;
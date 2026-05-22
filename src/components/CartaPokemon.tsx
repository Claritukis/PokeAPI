import { useNavigate } from 'react-router-dom';
import type { pokemon } from '../types/pokemon';
import UsarFavoritos from '../hooks/UsarFavoritos';

type Props = {
  pokemon: pokemon;
};

function CartaPokemon({ pokemon }: Props) {
  const navigate = useNavigate();
  const { favoritos, cambiarFavorito } = UsarFavoritos();
  const esFavorito = favoritos.includes(pokemon.name);

  return (
    <div className="carta" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <button onClick={(e) => { e.stopPropagation(); cambiarFavorito(pokemon.name); }}>
        {esFavorito ? '★' : '☆'}
      </button>
    </div>
  );
}

export default CartaPokemon;
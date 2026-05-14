import { useNavigate } from 'react-router-dom';
import type { DetallePokemon } from '../types/pokemon';

type Props = {
  pokemon: DetallePokemon;
};

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();

  return (
    <div className="carta" onClick={() => navigate(`/pokemon/${pokemon.nombre}`)}>
      <img src={pokemon.imagen} alt={pokemon.nombre} />
      <h2>{pokemon.nombre}</h2>
    </div>
  );
}

export default PokemonCard;
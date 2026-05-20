import { Link, useNavigate } from 'react-router-dom';
import type { DetallePokemon } from '../types/pokemon';
import UsarFavoritos from '../hooks/UsarFavoritos';
type Props = {
  pokemon: DetallePokemon;
};

function CartaPokemon({ pokemon }: Props) {
  const navigate = useNavigate();
  const { favoritos, cambiarFavorito } = UsarFavoritos();
  const esFavorito = favoritos.includes(pokemon.nombre);

  return (
    <div className="carta" onClick={() => navigate(`/pokemon/${pokemon.nombre}`)}>
      <img src={pokemon.imagen} alt={pokemon.nombre} />
      <h2>{pokemon.nombre}</h2>

      {/* Boton favorito */}
      <button onClick={() => cambiarFavorito(pokemon.nombre)}>
        {esFavorito ? '★' : '☆'}
      </button><br /><br />

      {/* Ir al detalle */}
      <Link to={`/pokemon/${pokemon.nombre}`}>Ver detalle</Link>
    </div>
  );
}

export default CartaPokemon;
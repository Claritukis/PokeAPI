type Props = {
  esFavorito: boolean;
  cambiarFavorito: () => void;
};

function FavoritosPokemon({esFavorito, cambiarFavorito}: Props) {
  return (
    <button onClick={cambiarFavorito}>{esFavorito ? 'Quitar favorito' : 'Agregar favorito'}</button>
  );
}

export default FavoritosPokemon;
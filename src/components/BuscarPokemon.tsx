type Props = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
};

function BuscarPokemon({ busqueda, setBusqueda }: Props) {
  return (
    <input type="text" placeholder="Buscar pokemon..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
  );
}

export default BuscarPokemon;
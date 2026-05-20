type Props = {
  tipo: string;
  setTipo: (valor: string) => void;
};

// La lista si la peddi a la IA porque no sabia como organizarlo del tipo de cada pokemon que se extrae de la API, entonces lo hice manualmente con los tipos mas comunes
function FiltrosPokemon({ tipo, setTipo }: Props) {
  return (
    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
      <option value="">Todos los tipos</option>
      <option value="normal">Normal</option>
      <option value="fire">Fuego (Fire)</option>
      <option value="water">Agua (Water)</option>
      <option value="grass">Planta (Grass)</option>
      <option value="electric">Eléctrico (Electric)</option>
      <option value="ice">Hielo (Ice)</option>
      <option value="fighting">Lucha (Fighting)</option>
      <option value="poison">Veneno (Poison)</option>
      <option value="ground">Tierra (Ground)</option>
      <option value="flying">Volador (Flying)</option>
      <option value="psychic">Psíquico (Psychic)</option>
      <option value="bug">Bicho (Bug)</option>
      <option value="rock">Roca (Rock)</option>
      <option value="ghost">Fantasma (Ghost)</option>
      <option value="dragon">Dragón (Dragon)</option>
      <option value="dark">Siniestro (Dark)</option>
      <option value="steel">Acero (Steel)</option>
      <option value="fairy">Hada (Fairy)</option>
    </select>
  );
}

export default FiltrosPokemon;
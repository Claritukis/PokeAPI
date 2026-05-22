import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ObtenerListaPokemones } from '../services/API';
import { CompararPokemon, FormatoNombre, ObtenerGanador, statNames } from '../components/CompararPokemon';
import '../index.css';

export const PaginaComparar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemonLista, setPokemonLista] = useState<any[]>([]);
  const [cargandoLista, setCargandoLista] = useState(true);

  const pokemon1Param = searchParams.get('p1') || '';
  const pokemon2Param = searchParams.get('p2') || '';

  const { pokemon1, pokemon2, cargando, error } = CompararPokemon({
    pokemon1Name: pokemon1Param,
    pokemon2Name: pokemon2Param
  });

  useEffect(() => {
    ObtenerListaPokemones(150)
      .then((data) => {
        setPokemonLista(data || []);
        setCargandoLista(false);
        console.log('Lista cargada:', (data || []).length);
      })
      .catch((err) => {
        console.log('Error:', err);
        setCargandoLista(false);
      });
  }, []);

  const SeleccionarPokemon = (pokemon: string, slot: 'p1' | 'p2') => {
    const newParams = new URLSearchParams(searchParams);
    if (pokemon) {
      newParams.set(slot, pokemon);
    } else {
      newParams.delete(slot);
    }
    setSearchParams(newParams);
  };

  if (cargandoLista) {
    return (
      <div className="comparar-loading">
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  const total1 = pokemon1?.stats.reduce((sum, s) => sum + s.base_stat, 0) || 0;
  const total2 = pokemon2?.stats.reduce((sum, s) => sum + s.base_stat, 0) || 0;

  const ambosSeleccionados = pokemon1Param && pokemon2Param;

  return (
    <div className="comparar-contenedor-principal">
      <h1 className="titulo">Comparador de Pokémon</h1>
      <p className="comparar-subtitle">Selecciona dos Pokémon para comparar</p>

      <div className="contenedor-filtros">
        <Link to="/"><button>Volver al Inicio</button></Link>
        <Link to="/favoritos"><button>Ir a Favoritos</button></Link>
      </div>

      <div className="comparar-seleccion">
        <div className="comparar-selector">
          <label>Primer Pokémon:</label>
          <select value={pokemon1Param} onChange={(e) => SeleccionarPokemon(e.target.value, 'p1')} className="comparar-select">
            <option value="">-- Seleccionar --</option>
            {pokemonLista.map((p) => (<option key={p.name} value={p.name}>{p.name}</option>))}
          </select>
        </div>

        <div className="comparar-selector">
          <label>Segundo Pokémon:</label>
          <select value={pokemon2Param} onChange={(e) => SeleccionarPokemon(e.target.value, 'p2')} className="comparar-select">
            <option value="">-- Seleccionar --</option>
            {pokemonLista.map((p) => (<option key={p.name} value={p.name}>{p.name}</option>))}
          </select>
        </div>
      </div>

      {error && (
        <div className="comparar-error">
          <p>{error}</p>
        </div>
      )}

      {!ambosSeleccionados && (
        <div className="comparar-sin-seleccion">
          <p>Selecciona dos Pokémon para ver la comparación</p>
        </div>
      )}

      {ambosSeleccionados && pokemon1 && pokemon2 && !cargando && (
        <div className="comparador-contenedor">
          <div className="comparador-header">
            <div className="comparador-pokemon-card">
              <img src={pokemon1.sprites.other?.['official-artwork']?.front_default || pokemon1.sprites.front_default} alt={pokemon1.name} />
              <h3>{FormatoNombre(pokemon1.name)}</h3>
              <div>{pokemon1.types.map((t) => (<span key={t.slot}>{FormatoNombre(t.type.name)}</span>))}</div>
              <p>Total: {total1}</p>
            </div>

            <div className="comparador-vs"><span>VS</span></div>

            <div className="comparador-pokemon-card">
              <img src={pokemon2.sprites.other?.['official-artwork']?.front_default || pokemon2.sprites.front_default} alt={pokemon2.name} />
              <h3>{FormatoNombre(pokemon2.name)}</h3>
              <div>{pokemon2.types.map((t) => (<span key={t.slot}>{FormatoNombre(t.type.name)}</span>))}</div>
              <p>Total: {total2}</p>
            </div>
          </div>

          <div className="comparador-stats">
            <h2>Estadísticas</h2>
            {pokemon1.stats.map((stat, index) => {
              const stat2 = pokemon2.stats[index];
              const winner = ObtenerGanador(stat.base_stat, stat2.base_stat);
              const nombre = statNames[stat.stat.name] || FormatoNombre(stat.stat.name);

              return (
                <div key={stat.stat.name} className="comparador-stat-row">
                  <div className={winner === 'p1' ? 'ganador' : ''}>{stat.base_stat}</div>
                  <div>{nombre}</div>
                  <div className={winner === 'p2' ? 'ganador' : ''}>{stat2.base_stat}</div>
                </div>
              );
            })}
          </div>

          <div className="comparador-ganador">
            {total1 > total2 && <h3>Ganador: {FormatoNombre(pokemon1.name)} ({total1})</h3>}
            {total2 > total1 && <h3>Ganador: {FormatoNombre(pokemon2.name)} ({total2})</h3>}
            {total1 === total2 && <h3>Empate!</h3>}
          </div>
        </div>
      )}
    </div>
  );
};
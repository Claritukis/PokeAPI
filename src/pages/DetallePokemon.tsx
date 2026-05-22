import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { pokemon } from '../types/pokemon';
import { ObtenerDetallePokemon } from '../services/API';
import '../index.css';

export default function DetallePokemon() {
  const { nombre } = useParams();
  const navegar = useNavigate();
  const [pokemon, setPokemon] = useState<pokemon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nombre) {
      return;
    }

    setCargando(true);
    setError(null);

    ObtenerDetallePokemon(nombre)
      .then(setPokemon)
      .catch((err) => {
        console.log('Error:', err);
        setError('Pokémon no encontrado. Verifica el nombre.');
      })
      .finally(() => setCargando(false));
  }, [nombre]);

  if (cargando) {
    return <h2 className="cargando-texto">Cargando Pokémon...</h2>;
  }

  if (error) {
    return (
      <div className="detalle-contenedor-principal">
        <div className="detalle-contenido error">
          <p>{error}</p>
          <button onClick={() => navegar('/')}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return <h2>No se encontró el Pokémon</h2>;
  }

  // Función para formatear nombres (kebab-case a Title Case)
  const formatearNombre = (nombre: string) => {
    return nombre
      .replace(/-/g, ' ')
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };

  return (
    <div className="detalle-contenedor-principal">
      <div className="detalle-contenido">
        <button className="boton-volver" onClick={() => navegar(-1)}>
          Regresar
        </button>
        <h1>{pokemon.name.toUpperCase()}</h1>

        <h2>Sprites</h2>
        <div className="detalle-bloque-izq">
          <img
            src={
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
        </div>

        <h2>Información General</h2>
        <div className="detalle-bloque-der">
          <div className="detalle-grid-datos">
            <div className="detalle-fila-info">
              <p><strong>ID:</strong> #{pokemon.id}</p>
            </div>
            <div className="detalle-fila-info">
              <p><strong>Orden:</strong> {pokemon.order}</p>
            </div>
            <div className="detalle-fila-info">
              <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            </div>
            <div className="detalle-fila-info">
              <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            </div>
            <div className="detalle-fila-info">
              <p><strong>Experiencia Base:</strong> {pokemon.base_experience}</p>
            </div>
            <div className="detalle-fila-info">
              <p><strong>Es Pokémon por defecto:</strong> {pokemon.is_default ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </div>

        <hr className="separador-seccion" />

        <h2>Species</h2>
        <div className="detalle-grid-datos">
          <div className="detalle-fila-info">
            <p><strong>Nombre:</strong> {formatearNombre(pokemon.species.name)}</p>
          </div>
        </div>

        <hr className="separador-seccion" />

        <h2>Tipos</h2>
        <div className="detalle-grid-datos">
          {pokemon.types.map((tipo) => (
            <div key={tipo.slot} className="detalle-fila-info">
              <p><strong>Slot {tipo.slot}:</strong> {formatearNombre(tipo.type.name)}</p>
              <p><strong>Tipo:</strong> {tipo.type.name}</p>
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Habilidades</h2>
        <div className="detalle-grid-datos">
          {pokemon.abilities.map((habilidad, index) => (
            <div key={index} className="detalle-fila-info">
              <p><strong>Nombre:</strong> {formatearNombre(habilidad.ability?.name || '')}</p>
              <p><strong>Oculta:</strong> {habilidad.is_hidden ? 'Sí' : 'No'}</p>
              <p><strong>Slot:</strong> {habilidad.slot}</p>
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Estadísticas Base</h2>
        <div className="detalle-grid-datos detalle-info-stats">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="detalle-fila-info">
              <span className="stat-label">{formatearNombre(stat.stat.name)}</span>
              <div className="stat-bar-container">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                >
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              </div>
              <span className="stat-effort">Effort: {stat.effort}</span>
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Forms</h2>
        <div className="detalle-grid-datos">
          {pokemon.forms.map((form) => (
            <div key={form.name} className="detalle-fila-info">
              <p><strong>Nombre:</strong> {formatearNombre(form.name)}</p>
              <p><strong>URL:</strong> {form.url}</p>
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Movimientos</h2>
        <div className="detalle-grid-datos detalle-scroll">
          {pokemon.moves.map((move, index) => (
            <div key={index} className="detalle-fila-info">
              <p><strong>Movimiento:</strong> {formatearNombre(move.move.name)}</p>
              {move.version_group_details.map((detalle, i) => (
                <div key={i} className="movimiento-detalle">
                  <p><strong>Nivel:</strong> {detalle.level_learned_at}</p>
                  <p><strong>Método:</strong> {formatearNombre(detalle.move_learn_method.name)}</p>
                  <p><strong>Grupo:</strong> {formatearNombre(detalle.version_group.name)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Held Items</h2>
        <div className="detalle-grid-datos">
          {pokemon.held_items.length > 0 ? (
            pokemon.held_items.map((item, index) => (
              <div key={index} className="detalle-fila-info">
                <p><strong>Item:</strong> {formatearNombre(item.item.name)}</p>
                {item.version_details.map((detalle, i) => (
                  <div key={i}>
                    <p><strong>Rareza:</strong> {detalle.rarity}</p>
                    <p><strong>Versión:</strong> {formatearNombre(detalle.version.name)}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="detalle-fila-info">
              <p>No tiene objetos equipados</p>
            </div>
          )}
        </div>

        <hr className="separador-seccion" />

        <h2>Versiones</h2>
        <div className="detalle-grid-datos">
          {pokemon.game_indices.map((game, index) => (
            <div key={index} className="detalle-fila-info">
              <p><strong>Índice:</strong> {game.game_index}</p>
              <p><strong>Versión:</strong> {formatearNombre(game.version.name)}</p>
            </div>
          ))}
        </div>

        <hr className="separador-seccion" />

        <h2>Cries (Sonidos)</h2>
        <div className="detalle-cries-contenedor">
          <div className="detalle-audio-item">
            <p>Latest Cry</p>
            <audio controls>
              <source src={pokemon.cries?.latest} />
            </audio>
          </div>
          <div className="detalle-audio-item">
            <p>Legacy Cry</p>
            <audio controls>
              <source src={pokemon.cries?.legacy} />
            </audio>
          </div>
        </div>

        <hr className="separador-seccion" />

        <h2>Habilidades Pasadas</h2>
        <div className="detalle-grid-datos">
          {pokemon.past_abilities && pokemon.past_abilities.length > 0 ? (
            pokemon.past_abilities.map((past, index) => (
              <div key={index} className="detalle-fila-info">
                <p><strong>Generación:</strong> {formatearNombre(past.generation.name)}</p>
                {past.abilities.map((ability, i) => (
                  <div key={i}>
                    <p><strong>Habilidad:</strong> {formatearNombre(ability.ability?.name || '')}</p>
                    <p><strong>Oculta:</strong> {ability.is_hidden ? 'Sí' : 'No'}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="detalle-fila-info">
              <p>No hay habilidades pasadas</p>
            </div>
          )}
        </div>

        <hr className="separador-seccion" />

        <h2>Estadísticas Anteriores</h2>
        <div className="detalle-grid-datos">
          {pokemon.past_stats && pokemon.past_stats.length > 0 ? (
            pokemon.past_stats.map((past, index) => (
              <div key={index} className="detalle-fila-info">
                <p><strong>Generación:</strong> {formatearNombre(past.generation.name)}</p>
                {past.stats.map((stat, i) => (
                  <div key={i}>
                    <p><strong>Stat:</strong> {formatearNombre(stat.stat.name)}</p>
                    <p><strong>Base Stat:</strong> {stat.base_stat}</p>
                    <p><strong>Effort:</strong> {stat.effort}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="detalle-fila-info">
              <p>No hay estadísticas anteriores</p>
            </div>
          )}
        </div>

        <hr className="separador-seccion" />

        <h2>Ubicaciones</h2>
        <div className="detalle-grid-datos">
          <div className="detalle-fila-info">
            <p><strong>URL de Encuentros:</strong> {pokemon.location_area_encounters}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
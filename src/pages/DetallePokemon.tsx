import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import type { DetallePokemon } from '../types/pokemon';
import { ObtenerDetallePokemon } from '../services/API';
import '../index.css';

export default function DetallePokemon() {

  const { nombre } = useParams();
  const navegar = useNavigate();
  const [pokemon, setPokemon] = useState<DetallePokemon | null>(null);

  useEffect(() => {
    if (nombre) {
      ObtenerDetallePokemon(nombre).then(setPokemon);
    }
  }, [nombre]);

  if (!pokemon) {
    return <h2 className="titulo">Buscando Pokémon...</h2>;
  }

  return (
    <div className="contenedor detalle-page">
      <button onClick={() => navegar(-1)} className="boton-volver">Regresar</button><br /><br />

      <div className="detalle-contenido">
        <h1>{pokemon.nombre}</h1>
        <img src={pokemon.imagen} alt={pokemon.nombre} width="200"/>

        <p><strong>ID:</strong> {pokemon.id}</p>
        <p><strong>Altura:</strong> {pokemon.altura}</p>
        <p><strong>Peso:</strong> {pokemon.peso}</p>

        <div>
          <h3>Tipos</h3>
          {pokemon.tipos.map((tipo) => (
            <p key={tipo.nombre}>{tipo.nombre}</p>
          ))}
        </div>

        <div>
          <h3>Habilidades</h3>
          {pokemon.habilidades.map((habilidad) => (
            <p key={habilidad.nombre}>{habilidad.nombre}</p>
          ))}
        </div>

        <div>
          <h3>Estadisticas</h3>
          {pokemon.estadisticas.map((estadistica) => (
            <p key={estadistica.nombre}>{estadistica.nombre} : {' '} {estadistica.valor} </p>
          ))}
        </div>
      </div>
    </div>
  );
}
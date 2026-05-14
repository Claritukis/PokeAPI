import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { DetallePokemon } from '../types/pokemon';
import { ObtenerDetallePokemon } from '../services/API';

export default function DetailPage() {
  const { nombre } = useParams();
  const navegar = useNavigate();
  const [pokemon, setPokemon] = useState<DetallePokemon | null>(null);

  useEffect(() => {
    if (nombre) {
      ObtenerDetallePokemon(nombre).then(setPokemon);
    }
  }, [nombre]);

  if (!pokemon) return <h2 className="titulo">Buscando Pokémon...</h2>;

  return (
    <div className="contenedor" style={{ padding: '10px' }}>
      <button onClick={() => navegar(-1)} className="boton-volver" style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}> Regresar </button>

      <div className="detalle-contenido" style={{ border: '1px solid #ddd', borderRadius: '20px', padding: '20px', backgroundColor: '#fff' }}>
        <h1>{pokemon.nombre}</h1>
        <img src={pokemon.imagen} alt={pokemon.nombre}  width="200"/>
        
        <p> <strong>ID:</strong> {pokemon.id} </p>
        <p> <strong>Altura:</strong> {pokemon.altura} </p>
        <p> <strong>Peso:</strong> {pokemon.peso}  </p>

        <div>
          <h3>Tipos</h3>
          {pokemon.tipos.map((tipo) => ( <p key={tipo.nombre}> {tipo.nombre} </p> ))}
        </div>

        <div>
          <h3>Habilidades</h3> 
          {pokemon.habilidades.map((habilidad) => ( <p key={habilidad.nombre}> {habilidad.nombre} </p> ))}
        </div>

        <div>
          <h3>Estadisticas</h3>
          {pokemon.estadisticas.map((estadistica) => ( <p key={estadistica.nombre}> {estadistica.nombre} : {' '} {estadistica.valor} </p> ))}
        </div>

      </div>

    </div>
  );
}
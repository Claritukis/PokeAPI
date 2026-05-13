import { useEffect, useState } from 'react';

import type { DetallePokemon } from './types/pokemon';

import { ObtenerListaPokemones, ObtenerDetallePokemon } from './services/API';

import './index.css';

function App() {

  // Guardar informacion de los pokemones
  const [pokemones, setPokemones] = useState<DetallePokemon[]>([]);

  useEffect(() => {

    // Funcion para cargar pokemones
    const cargarPokemones = async () => {

      // Obtener lista de pokemones
      const lista = await ObtenerListaPokemones(20);

      // Obtener detalles de cada pokemon
      const detalles = await Promise.all(

        lista.map((pokemon) =>
          ObtenerDetallePokemon(pokemon.nombre)
        )

      );

      // Guardar informacion
      setPokemones(detalles);
    };

    cargarPokemones();

  }, []);

  return (

    <div className="contenedor">

      <h1 className="titulo">Paginukis de Pokédex</h1><br />

      <div className="contenedor-cartas">

        {pokemones.map((pokemon) => (

          <div
            key={pokemon.id}
            className="carta"
          >

            <h2>{pokemon.nombre}</h2>

            <img src={pokemon.imagen} alt={pokemon.nombre} width="120" />

            <p><strong>ID:</strong> {pokemon.id}</p>

            <p><strong>Altura:</strong> {pokemon.altura}</p>

            <p><strong>Peso:</strong> {pokemon.peso}</p>

            <div><strong>Tipo:</strong>

              {pokemon.tipos.map((tipo) => (
                <p key={tipo.nombre}>{tipo.nombre}</p>
              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
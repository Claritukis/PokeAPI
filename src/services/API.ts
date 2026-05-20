// Libreria para usar fetch y consumir la API
import type {
  Pokemon,
  DetallePokemon
} from '../types/pokemon';

// API de pokemones
const API_URL = 'https://pokeapi.co/api/v2';

// Obtener lista de pokemones
export const ObtenerListaPokemones = async (limite: number = 100): Promise<Pokemon[]> => {
  // fetch hace la peticion a la API
  const respuesta = await fetch(`${API_URL}/pokemon?limit=${limite}` );

  // Convertir respuesta a json
  const data = await respuesta.json();

  // data.results es un array de pokemones y map itera sobre ellos para obtener la informacion
  return data.results.map((pokemon: any) => ({
    nombre: pokemon.name,
    enlace: pokemon.url
  }));
};

// Obtener detalles de un pokemon
export const ObtenerDetallePokemon = async (nombre: string): Promise<DetallePokemon> => {

  // Peticion a la API
  const respuesta = await fetch(`${API_URL}/pokemon/${nombre}` );

  // Convertir respuesta a json
  const data = await respuesta.json();

  // Retornar informacion
  return {
    id: data.id,
    nombre: data.name,
    altura: data.height,
    peso: data.weight,

    // Imagen
    imagen: data.sprites.front_default,

    // Tipos
    tipos: data.types.map((tipo: any) => ({
      nombre: tipo.type.name
    })),

    // Habilidades
    habilidades: data.abilities.map((habilidad: any) => ({
      nombre: habilidad.ability.name
    })),

    // Estadisticas
    estadisticas: data.stats.map((estadistica: any) => ({
      nombre: estadistica.stat.name,
      valor: estadistica.base_stat
    }))
  };
};
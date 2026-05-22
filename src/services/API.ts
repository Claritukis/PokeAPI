import type { pokemon } from '../types/pokemon';

const API = 'https://pokeapi.co/api/v2';

// Obtener lista de pokemones
export const ObtenerListaPokemones = async (limite: number = 30) => {
  const respuesta = await fetch(`${API}/pokemon?limit=${limite}`);
  const datos = await respuesta.json();
  
  console.log('Lista obtenida:', datos.results);
  return datos.results;
};

// Obtener detalle de un pokemon
export const ObtenerDetallePokemon = async (nombre: string): Promise<pokemon> => {
  const respuesta = await fetch(`${API}/pokemon/${nombre}`);

  if (!respuesta.ok) {
    console.log('Error: Pokemon no encontrado -', nombre);
    return {} as pokemon;
  }

  const datos = await respuesta.json();
  
  console.log('Detalle obtenido:', datos.name);
  return datos;
};
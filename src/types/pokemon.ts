// Lista simple de pokemones
export interface Pokemon {
  nombre: string;
  enlace: string;
}

// Respuesta cuando se piden varios pokemones
export interface RespuestaPokemon {
  total: number;
  siguiente: string | null;
  anterior: string | null;

  resultados: Pokemon[];
}

// Datos de un pokemon
export interface DetallePokemon {
  id: number;
  nombre: string;
  altura: number;
  peso: number;

  // Imagen del pokemon
  imagen: string;

  // Lista del tipo de pokemon
  tipos: {
    nombre: string;
  }[];
}
import { useState, useEffect } from 'react';
import { ObtenerDetallePokemon } from '../services/API';
import type { pokemon } from '../types/pokemon';

interface Props {
  pokemon1Name: string;
  pokemon2Name: string;
}

interface ComparacionData {
  pokemon1: pokemon | null;
  pokemon2: pokemon | null;
  cargando: boolean;
  error: string | null;
}

export const CompararPokemon = ({ pokemon1Name, pokemon2Name }: Props): ComparacionData => {
  const [pokemon1, setPokemon1] = useState<pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<pokemon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoth = async () => {
      setCargando(true);
      setError(null);

      try {
        const [p1, p2] = await Promise.all([
          ObtenerDetallePokemon(pokemon1Name),
          ObtenerDetallePokemon(pokemon2Name)
        ]);
        setPokemon1(p1);
        setPokemon2(p2);
        console.log('Comparacion cargada:', p1.name, 'vs', p2.name);
      } catch (err) {
        console.log('Error:', err);
        setError('Error al cargar los Pokémon');
      } finally {
        setCargando(false);
      }
    };

    if (pokemon1Name && pokemon2Name) {
      fetchBoth();
    }
  }, [pokemon1Name, pokemon2Name]);

  return { pokemon1, pokemon2, cargando, error };
};

export const FormatoNombre = (name: string) => {
  return name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const ObtenerGanador = (stat1: number, stat2: number): 'p1' | 'p2' | 'tie' => {
  if (stat1 > stat2) return 'p1';
  if (stat2 > stat1) return 'p2';
  return 'tie';
};

export const statNames: Record<string, string> = {
  'hp': 'PS',
  'attack': 'Ataque',
  'defense': 'Defensa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defensa Esp.',
  'speed': 'Velocidad'
};
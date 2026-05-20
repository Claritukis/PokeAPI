import { useState } from 'react';
import {GuardarFavoritos, ObtenerFavoritos} from '../storage/favoritos';

export default function UsarFavoritos() {
  // Lista de favoritos
  const [favoritos, setFavoritos] = useState<string[]>(ObtenerFavoritos());

  // Agregar o quitar favorito
  const cambiarFavorito = (nombre: string) => {
    let nuevosFavoritos = [...favoritos];

    // Verificar si ya existe
    if (favoritos.includes(nombre)) {
      // Quitar favorito
      nuevosFavoritos = favoritos.filter((favorito) => favorito !== nombre);

    } else {
      // Agregar favorito
      nuevosFavoritos.push(nombre);
    }

    // Guardar favoritos
    setFavoritos(nuevosFavoritos);

    GuardarFavoritos(nuevosFavoritos);
  };

  return {favoritos, cambiarFavorito};
}
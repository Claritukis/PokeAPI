import { useState } from 'react';
import {ObtenerFavoritos, AlternarFavorito} from '../storage/favoritos';

export default function UsarFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>(ObtenerFavoritos());

  const actualizarFavoritos = () => {
    setFavoritos(ObtenerFavoritos());
  };

  const cambiarFavorito = (nombre: string) => {
    AlternarFavorito(nombre);
    actualizarFavoritos();
  };

  return { favoritos, cambiarFavorito };
}
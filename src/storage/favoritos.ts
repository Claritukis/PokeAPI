export const ObtenerFavoritos = (): string[] => {
  const favoritos = localStorage.getItem('favoritos');
  return favoritos ? JSON.parse(favoritos) : [];
};

export const AlternarFavorito = (nombre: string) => {
  const favoritos = ObtenerFavoritos();
  
  if (favoritos.includes(nombre)) {
    const nuevosFavoritos = favoritos.filter(f => f !== nombre);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  } else {
    localStorage.setItem('favoritos', JSON.stringify([...favoritos, nombre]));
  }
};
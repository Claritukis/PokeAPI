export const GuardarFavoritos = (favoritos: string[]) => {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
};

export const ObtenerFavoritos = () => {
  const favoritos = localStorage.getItem('favoritos');
  return favoritos ? JSON.parse(favoritos): [];
};
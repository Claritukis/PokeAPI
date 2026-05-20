import { useEffect, useState } from 'react';
import type { DetallePokemon } from '../types/pokemon';
import { ObtenerDetallePokemon } from '../services/API';
import UsarFavoritos from '../hooks/UsarFavoritos';
import CartaPokemon from '../components/CartaPokemon';
import { useNavigate } from 'react-router-dom';

export default function FavoritosPage() {

    // Obtener favoritos
    const { favoritos } = UsarFavoritos();

    const navegar = useNavigate();

    // Guardar datos
    const [pokemones, setPokemones] = useState<DetallePokemon[]>([]);

    useEffect(() => {

        const cargarFavoritos = async () => {
            // Obtener detalles
            const detalles = await Promise.all(favoritos.map((nombre) => ObtenerDetallePokemon(nombre)));

            setPokemones(detalles);
        };
        cargarFavoritos();
    }, [favoritos]);

    return (
        <div className="contenedor">
            <h1 className="titulo">Pokemones Favoritos</h1>

            <button onClick={() => navegar(-1)} className="boton-volver">Regresar</button>

            {pokemones.length === 0 && (<p>No tienes favoritos</p>)}

            <div className="contenedor-cartas">
                {pokemones.map((pokemon) => (<CartaPokemon key={pokemon.id} pokemon={pokemon} />))}
            </div>

        </div>
    );
}
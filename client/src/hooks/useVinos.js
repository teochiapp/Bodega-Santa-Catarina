import { useState, useEffect } from 'react';
import { obtenerVinos, crearVino, editarVino, eliminarVino } from '../services/vinosService';

/**
 * Hook que carga la lista de vinos desde la API.
 * Maneja los estados de loading, error y data.
 */
const useVinos = () => {
  const [vinos, setVinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarVinos = async () => {
      try {
        const data = await obtenerVinos();
        setVinos(data);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los vinos');
      } finally {
        setCargando(false);
      }
    };

    cargarVinos();
  }, []);

  const agregarVino = async (vinoData) => {
    const nuevoVino = await crearVino(vinoData);
    setVinos((prev) => [nuevoVino, ...prev]);
    return nuevoVino;
  };

  const actualizarVino = async (id, vinoData) => {
    const vinoActualizado = await editarVino(id, vinoData);
    setVinos((prev) => prev.map((v) => (v.id === id ? vinoActualizado : v)));
    return vinoActualizado;
  };

  const borrarVino = async (id) => {
    await eliminarVino(id);
    setVinos((prev) => prev.filter((v) => v.id !== id));
  };

  return { vinos, cargando, error, agregarVino, actualizarVino, borrarVino };
};

export default useVinos;

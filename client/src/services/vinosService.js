import api from './api';

/**
 * Obtiene todos los vinos del backend.
 * @returns {Promise<Vino[]>}
 */
const obtenerVinos = () => api.get('/vinos');

/**
 * Crea un nuevo vino.
 * @param {object} vinoData 
 * @returns {Promise<Vino>}
 */
const crearVino = (vinoData) => api.post('/vinos', vinoData);
/**
 * Edita un vino.
 * @param {number|string} id 
 * @param {object} vinoData 
 * @returns {Promise<Vino>}
 */
const editarVino = (id, vinoData) => api.put(`/vinos/${id}`, vinoData);

/**
 * Elimina un vino.
 * @param {number|string} id 
 * @returns {Promise<void>}
 */
const eliminarVino = (id) => api.delete(`/vinos/${id}`);

export { obtenerVinos, crearVino, editarVino, eliminarVino };

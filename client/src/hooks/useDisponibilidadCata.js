import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

/**
 * Disponibilidad mensual de una experiencia.
 * dias: { 'YYYY-MM-DD': [{ hora, cupo, disponibles }] } (solo días reservables)
 * `mes` en formato 'YYYY-MM'. Si falta cataId o mes no hace nada.
 */
const useDisponibilidadCata = (cataId, mes) => {
  const [estado, setEstado] = useState({ clave: '', dias: {}, error: '' });
  const [version, setVersion] = useState(0);
  const clave = cataId && mes ? `${cataId}|${mes}|${version}` : '';

  useEffect(() => {
    if (!clave) return undefined;
    let activo = true;
    api.get(`/reservas/disponibilidad?cataId=${cataId}&mes=${mes}`)
      .then((data) => activo && setEstado({ clave, dias: data.dias || {}, error: '' }))
      .catch((err) => activo && setEstado({ clave, dias: {}, error: err.message }));
    return () => { activo = false; };
  }, [clave, cataId, mes]);

  const cargando = Boolean(clave) && estado.clave !== clave;
  const recargar = useCallback(() => setVersion((v) => v + 1), []);

  return {
    dias: clave ? estado.dias : {},
    error: clave ? estado.error : '',
    cargando,
    recargar,
  };
};

export default useDisponibilidadCata;

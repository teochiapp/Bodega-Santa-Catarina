import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const HeroesContext = createContext({
  heroes: [],
  loading: true,
  getHero: () => null,
  refreshHeroes: async () => {},
});

export const HeroesProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHeroes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get('/heroes?soloActivos=true');
      if (Array.isArray(data)) {
        setHeroes(data);
      }
    } catch (err) {
      console.warn('No se pudieron cargar los heroes de páginas desde la API:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  /**
   * Busca un hero por identificador de sección o por ruta (URL)
   */
  const getHero = useCallback(
    (seccionORuta) => {
      if (!seccionORuta || !heroes.length) return null;
      const query = String(seccionORuta).trim().toLowerCase().replace(/\/$/, '');

      return (
        heroes.find((h) => {
          if (!h.activo) return false;
          const sec = (h.seccion || '').trim().toLowerCase();
          const ruta = (h.ruta || '').trim().toLowerCase().replace(/\/$/, '');
          return sec === query || ruta === query;
        }) || null
      );
    },
    [heroes]
  );

  return (
    <HeroesContext.Provider
      value={{
        heroes,
        loading,
        getHero,
        refreshHeroes: fetchHeroes,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
};

export const useHeroes = () => useContext(HeroesContext);

export default HeroesContext;

import { useEffect, useState } from 'react';
import { fetchSpecialtiesCount } from '../services/fetchSpecialtiesCount';


export function useSpecialtiesCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCount(await fetchSpecialtiesCount());
      } catch {
        setError('No se pudo obtener la cantidad de especialidades');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { count, isLoading, error };
}
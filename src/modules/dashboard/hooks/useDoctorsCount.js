import { useEffect, useState } from 'react';
import { fetchDoctorsCount } from '../services/fetchDoctorsCount';

export function useDoctorsCount() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCount(await fetchDoctorsCount());
      } catch {
        setError('No se pudo obtener la cantidad de doctores');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { count, isLoading, error };
}
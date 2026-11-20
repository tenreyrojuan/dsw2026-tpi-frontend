import { useEffect, useState } from 'react';
import { fetchBookedSlotsCount } from '../services/fetchBookedSlotsCount'; // !!

export function useBookedSlotsCount() {  // !!
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCount(await fetchBookedSlotsCount()); // !!
      } catch {
        setError('No se pudo obtener la cantidad de turnos confirmados para el dia de hoy');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { count, isLoading, error };
}
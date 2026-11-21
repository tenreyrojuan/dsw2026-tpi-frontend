import { useEffect, useState } from 'react';
import { fetchStats } from '../services/fetchStats';

export function useStats() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setStats(await fetchStats());
      } catch {
        setError('No se pudieron cargar las estadísticas');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { stats, isLoading, error };
}
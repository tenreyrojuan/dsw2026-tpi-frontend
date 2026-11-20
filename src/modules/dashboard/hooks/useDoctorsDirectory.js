import { useEffect, useState } from 'react';
import { fetchDoctors } from '../services/fetchDoctors';
import { usePaginate } from './usePaginate';

export function useDoctorsDirectory() {
  const [filteredDoctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalDoctors, setTotalDoctors] = useState(0);

  const pagination = usePaginate({pageSize: 10, pageIndex: 1 , totalItems: totalDoctors});

  useEffect(() => {
    async function load() {
      try {
        const { data, total } = await fetchDoctors({ pageSize: 3, pageIndex: 0, name: searchTerm });
        setDoctors(data);
        setTotalDoctors(total);
      } catch {
        setError('No se pudieron cargar los doctores');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [searchTerm]);

  return { filteredDoctors, searchTerm, setSearchTerm, isLoading, error, pagination, totalDoctors };
}
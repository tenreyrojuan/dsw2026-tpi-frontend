import { useState, useEffect, useCallback } from 'react';
import { fetchSpecialties } from '../services/fetchSpecialties';
import { usePaginate } from '../../shared/hooks/usePaginate';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pagination = usePaginate({pageSize: 10, pageIndex: 1, totalItems: totalSpecialties,});

  const name = searchTerm.length >= 3 ? searchTerm : null;

  const loadSpecialties = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await fetchSpecialties({
        pageSize: 10,
        pageIndex: pagination.currentPage,
        name,
      });

      if (data === null) {
        setSpecialties([]);
        setError('No se encontraron especialidades');
        return;
      }

      setSpecialties(data.data ?? []);
      setTotalSpecialties(data.total ?? 0);
      setError(error ?? '');
    } catch {
      setSpecialties([]);
      setError('Error al conectar con el servicio administrativo');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, name]);

  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  return {
    filteredSpecialties: specialties,
    specialties,
    reloadSpecialties: loadSpecialties,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    totalSpecialties,
    pagination,
  };
}
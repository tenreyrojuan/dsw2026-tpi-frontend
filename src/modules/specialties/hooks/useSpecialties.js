import { useState, useEffect, useCallback } from 'react';
import { fetchSpecialties } from '../services/fetchSpecialties';
import { SpecialtyFilter } from '../helpers/specialtyFilter';
import { usePaginate } from '../../shared/hooks/usePaginate';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pagination = usePaginate({pageSize: 10, pageIndex: 1, totalItems: totalSpecialties,});

  const loadSpecialties = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await fetchSpecialties({
        pageSize: 10,
        pageIndex: pagination.currentPage,
      });

      if (data === null) {
        setSpecialties([]);
        setError('No se encontraron especialidades');
        return;
      }

      setSpecialties(data.data ?? []);
      setTotalSpecialties(data.total ?? 0);
      setError(error ?? '');
    } catch (error) {
      console.error('Se produjo un error al buscar las especialidades:', error);
      setSpecialties([]);
      setError('Error al conectar con el servicio administrativo');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage]);

  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  const filteredSpecialties = SpecialtyFilter({ specialties, searchTerm });

  return {
    filteredSpecialties,
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
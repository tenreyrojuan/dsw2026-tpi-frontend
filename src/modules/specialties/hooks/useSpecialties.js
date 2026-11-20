import { useState, useEffect, useCallback } from 'react';
import { fetchSpecialties } from '../services/fetchSpecialties';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSpecialties = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchSpecialties();

    if (result.error) {
      setError(result.error);
      setSpecialties([]);
    } else {
      const items = Array.isArray(result.data)
        ? result.data
        : (result.data?.data ?? []);
      setSpecialties(items);
      setTotalSpecialties(result.total ?? items.length);
      setError(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  const safeList = Array.isArray(specialties) ? specialties : [];

  const filteredSpecialties = safeList.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    filteredSpecialties,
    reloadSpecialties: loadSpecialties,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    totalSpecialties,
  };
}
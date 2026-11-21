import { useState } from 'react';
import { fetchDoctors } from '../services/fetchDoctors';
import { useEffect } from 'react';
import { usePaginate } from '../../shared/hooks/usePaginate';
import { frontendErrorMessage } from '../helpers/backendError'

export function useDoctors({ pageSize = 10 } = {}) {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pagination = usePaginate({ pageSize, pageIndex: 1, totalItems: totalDoctors });

  function normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const onSearchTermChange = (e) => {
    let searchTerm = normalizeText(e.target.value);
    if (searchTerm.length >= 3 || searchTerm.length === 0) {
      setSearchTerm(searchTerm);
    }
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError('');

      try {
        const { filteredDoctors, total } = await fetchDoctors({ pageSize, pageIndex: pagination.currentPage, name: searchTerm });
        if (total === 0 || filteredDoctors.length === 0) {
          setDoctors([]);
          setTotalDoctors(0);
          setError('No se encontraron doctores');
          return;
        }

        setDoctors(filteredDoctors);
        setTotalDoctors(total);
      }
      catch (error) {
        const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
        const errorCode = error?.response?.data?.ErrorCode;

        if (issueMessage) {
          setError(issueMessage);
        } else if (errorCode && frontendErrorMessage[errorCode]) {
          setError(frontendErrorMessage[errorCode]);
        } else {
          setError('Error al conectar con el servicio administrativo');
        }
      }
      finally {
        setIsLoading(false);
      }
    }
    load();
  }, [pagination.currentPage, searchTerm]);

  return {
    doctors,
    onSearchTermChange,
    isLoading,
    error,
    totalDoctors,
    pagination
  };
}
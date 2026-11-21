import { useEffect, useState } from 'react';
import { fetchAppointments } from '../services/fetchAppointments';
import { usePaginate } from '../../shared/hooks/usePaginate';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

export function useAppointments() {
  const [filters, setFilters] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pagination = usePaginate({
    pageSize: 3,
    pageIndex: 1,
    totalItems,
  });

  const { currentPage, onPageChange } = pagination;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError('');

      try {
        const { data, total } = await fetchAppointments({
          ...filters,
          pageSize: 3,
          pageIndex: currentPage,
        });

        setAppointments(data);
        setTotalItems(total);
      } catch (error) {
        setError(parseBackendError(error));
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [filters, currentPage]);

  const applyFilters = (newFilters) => {
    setFilters(
      Object.fromEntries(
        Object.entries(newFilters).filter(([, value]) => value)
      )
    );
    onPageChange(1);
  };

  return {
    appointments,
    isLoading,
    error,
    pagination: { ...pagination, totalItems },
    applyFilters,
  };
}

import { useState, useEffect } from 'react';
import { fetchSpecialties } from '../services/fetchSpecialties';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
      async function load() {
        setIsLoading(true);

        try {
          const { data } = await fetchSpecialties();

            setSpecialties(data);

          if (data.length === 0) {
            setError('No se encontraron especialidades');
          }
        } catch (error) {
          setError(parseBackendError(error, frontendErrorMessage));
        } finally {
          setIsLoading(false);
        }
      }
      load();
    }, []);

    return { isLoading, specialties, error };
  }

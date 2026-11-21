import { useEffect, useMemo, useState } from 'react';
import { fetchSpecialties } from '../../specialties/services/fetchSpecialties';
import { fetchDoctors } from '../../doctors/services/fetchDoctors';
import { parseBackendError } from '../../shared/helpers/parseBackendError';
import { frontendErrorMessage } from '../helpers/backendError';

export function useBookingOptions(specialtyId) {
  const [specialties, setSpecialties] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const [specialtiesResult, doctorsResult] = await Promise.all([
          fetchSpecialties({ pageSize: 100, pageIndex: 1 }),
          fetchDoctors({ pageSize: 100, pageIndex: 1 }),
        ]);
        if (ignore) return;

        setSpecialties(specialtiesResult.data?.data ?? []);
        setAllDoctors(doctorsResult.filteredDoctors ?? []);
      } catch (error) {
        if (!ignore) setError(parseBackendError(error, frontendErrorMessage));
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // el backend solo filtra médicos por nombre, la especialidad se filtra acá
  const doctors = useMemo(
    () => allDoctors.filter((doctor) => doctor.specialty?.id === specialtyId),
    [allDoctors, specialtyId]
  );

  return { specialties, doctors, error };
}
import { useEffect, useState } from 'react';
import { fetchDoctors } from '../services/fetchDoctors';

export function useDoctorsDirectory() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setDoctors(await fetchDoctors());
      } catch {
        setError('No se pudieron cargar los doctores');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { filteredDoctors, searchTerm, setSearchTerm, isLoading, error };
}
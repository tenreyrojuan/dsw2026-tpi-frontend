import { useState } from 'react';
import { fetchDoctors } from '../services/fetchDoctors';
import { useEffect } from 'react';
import { DoctorFilter } from '../helpers/doctorFilter';
import { usePaginate } from './usePaginate';

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pagination = usePaginate({pageSize: 10, pageIndex: 1 , totalItems: totalDoctors});
  

  useEffect(() => {
    async function load() {
      setIsLoading(true);

      try{
        const { data, error } = await fetchDoctors({pageSize: 10, pageIndex: pagination.currentPage}); 
        if(data === null){
          setError("No se encontraron doctores")
          return;
        }

        setDoctors(data.data);
        setTotalDoctors(data.total ?? 0);
        setError(error ?? null);
      }
      catch(error){
        console.error('Se produjo un error al buscar los doctores:', error);
      }
      finally{
        setIsLoading(false);
      }
    }
    load(); 
  }, [pagination.currentPage]);

  const filteredDoctors = DoctorFilter({doctors, searchTerm});

  return { 
    filteredDoctors, 
    doctors,
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    error, 
    totalDoctors, 
    pagination
  };
}
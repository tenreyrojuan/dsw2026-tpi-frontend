import { useState, useEffect } from "react";
import { fetchSpecialties } from "../services/fetchSpecialties";

export function useSpecialties(){
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const specialties = await fetchSpecialties();

        if (specialties.data.length === 0)
          setError('No se encontraron especialidades');
        setSpecialties(specialties.data);

        setError(specialties.error);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return {isLoading, specialties, error}
}
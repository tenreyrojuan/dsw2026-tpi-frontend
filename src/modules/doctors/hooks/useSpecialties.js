import { useState, useEffect } from "react";
import { fetchSpecialties } from "../services/fetchSpecialties";

export function useSpecialties() {
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

      } catch (error) {
        const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
        const errorCode = error?.response?.data?.ErrorCode;

        if (issueMessage) {
          setError(issueMessage);
        } else if (errorCode && frontendErrorMessage[errorCode]) {
          setError(frontendErrorMessage[errorCode]);
        } else {
          setError('Error al conectar con el servicio administrativo');
        }
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return { isLoading, specialties, error }
}

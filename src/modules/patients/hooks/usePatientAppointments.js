import { useCallback, useEffect, useState } from 'react';
import { fetchPatientAppointments } from '../services/fetchPatientAppointments';
import { cancelAppointment } from '../services/cancelAppointment';
import { getPatientDni } from '../../auth/helpers/patientSession';
import { frontendErrorMessage } from '../helpers/backendError';

export function usePatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPatientAppointments({ dni: getPatientDni() });

      setAppointments(data);
    } catch (error) {
      const issue = error?.response?.data?.Details?.[0]?.Issue;
      const errorCode = error?.response?.data?.ErrorCode;

      if (issue) {
        setError(issue);
      } else if (errorCode && frontendErrorMessage[errorCode]) {
        setError(frontendErrorMessage[errorCode]);
      } else {
        setError('Error al conectar con el servicio de pacientes');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cancel = async (id) => {
    if (!window.confirm('¿Seguro que querés cancelar este turno?')) return;

    try {
      await cancelAppointment({ id });
      await load();
    } catch (error) {
      const issue = error?.response?.data?.Details?.[0]?.Issue;
      const errorCode = error?.response?.data?.ErrorCode;

      if (issue) {
        setError(issue);
      } else if (errorCode && frontendErrorMessage[errorCode]) {
        setError(frontendErrorMessage[errorCode]);
      } else {
        setError('Error al conectar con el servicio de pacientes');
      }
    }
  };

  return { appointments, isLoading, error, cancel };
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import { frontendErrorMessage } from '../../auth/helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

export function usePatientLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: '', dni: '' } });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { singinPatient } = useAuth();

  const onSubmit = async (data) => {
    try {
      await singinPatient(data.username, data.dni);
      navigate('/');
    } catch (error) {
      setErrorMessage(
        parseBackendError(
          error,
          frontendErrorMessage,
          'Error al conectar con el servicio de pacientes'
        )
      );
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    errorMessage,
  };
}

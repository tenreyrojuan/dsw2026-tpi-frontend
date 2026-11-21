import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import { frontendErrorMessage } from '../../auth/helpers/backendError';

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
      const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
      const errorCode = error?.response?.data?.ErrorCode;

      if (issueMessage) {
        setErrorMessage(issueMessage);
      } else if (errorCode && frontendErrorMessage[errorCode]) {
        setErrorMessage(frontendErrorMessage[errorCode]);
      } else {
        setErrorMessage('Error al conectar con el servicio de pacientes');
      }
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

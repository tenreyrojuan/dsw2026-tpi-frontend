import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { frontendErrorMessage } from '../helpers/backendError';

export function useAdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: '', password: '' } });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { singinAdmin } = useAuth();

  const onSubmit = async (data) => {
    try {
      await singinAdmin(data.username, data.password);
      navigate('/admin/home');
    } catch (error) {
      const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
      const errorCode = error?.response?.data?.ErrorCode;

      if (issueMessage) {
        setErrorMessage(issueMessage);
      } else if (errorCode && frontendErrorMessage[errorCode]) {
        setErrorMessage(frontendErrorMessage[errorCode]);
      } else {
        setErrorMessage('Error al conectar con el servicio administrativo');
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

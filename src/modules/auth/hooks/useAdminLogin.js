import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

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
      setErrorMessage(parseBackendError(error, frontendErrorMessage));
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

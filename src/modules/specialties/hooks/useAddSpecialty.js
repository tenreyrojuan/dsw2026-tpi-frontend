import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addSpecialty } from '../services/addSpecialty';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

export function useAddSpecialty() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const goToSpecialties = () => navigate('/admin/specialties');

  const onSubmit = async (data) => {
    setErrorMessage(null);

    try {
      await addSpecialty({
        name: data.name,
        description: data.description,
      });
      goToSpecialties();
    } catch (error) {
      setErrorMessage(parseBackendError(error, frontendErrorMessage));
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    onCancel: goToSpecialties,
    errorMessage,
  };
}
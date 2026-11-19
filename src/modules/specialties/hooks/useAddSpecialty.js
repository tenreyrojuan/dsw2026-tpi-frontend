import { useNavigate } from 'react-router-dom';
import { addSpecialty } from '../services/addSpecialty';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function useAddSpecialty() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await addSpecialty({
        name: data.name.trim(),
        description: data.description.trim(),
      });
      navigate('/admin/specialties');
    } catch (error) {
      const apiMessage =
        error.response?.status === 409
          ? 'Ya existe una especialidad con ese nombre.'
          : error.response?.data?.message ||
            'Ocurrió un error al registrar la especialidad.';

      setServerError(apiMessage);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    serverError,
    onSubmit,
    navigate,
  };
}
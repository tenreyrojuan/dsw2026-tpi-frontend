import { useNavigate } from 'react-router-dom';
import { AddDoctor } from '../services/addDoctor';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export function useDoctorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await AddDoctor({
        name: data.name,
        licenseNumber: data.licenseNumber,
        specialtyId: data.specialtyId,
      });
      navigate(-1);
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
    errorMessage,
  };
}

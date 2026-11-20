import { useNavigate } from 'react-router-dom';
import { AddDoctor } from '../services/addDoctor';
import { frontendErrorMessage } from '../helpers/backendError';
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
      const { newDoctor, error } = await AddDoctor({
        name: data.name,
        licenseNumber: data.licenseNumber,
        specialtyId: data.specialtyId,
      });
      navigate(-1);
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
    isSubmitting,
    onSubmit,
    errorMessage,
  };
}

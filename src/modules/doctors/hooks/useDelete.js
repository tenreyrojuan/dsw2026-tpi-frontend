import { DeleteDoctor } from '../services/deleteDoctor';
import { useState } from 'react';
import { frontendErrorMessage } from '../helpers/backendError';

export function useDelete() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const removeDoctor = async (doctorId) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await DeleteDoctor({ id: doctorId });
      return true;
    } catch (error) {
      const issueMessage = error?.response?.data?.Details?.[0]?.Issue;
      const errorCode = error?.response?.data?.ErrorCode;
      if (issueMessage) {
        setDeleteError(issueMessage);
      } else if (errorCode && frontendErrorMessage[errorCode]) {
        setDeleteError(frontendErrorMessage[errorCode]);
      } else {
        setDeleteError('Error al conectar con el servicio administrativo');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    removeDoctor,
    isDeleting,
    deleteError,
  };
}

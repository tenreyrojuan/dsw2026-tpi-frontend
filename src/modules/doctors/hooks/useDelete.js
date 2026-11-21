import { DeleteDoctor } from '../services/deleteDoctor';
import { useState } from 'react';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

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
      setDeleteError(parseBackendError(error, frontendErrorMessage));
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

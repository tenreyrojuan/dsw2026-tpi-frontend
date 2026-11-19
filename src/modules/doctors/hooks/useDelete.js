import { DeleteDoctor } from '../services/deleteDoctor';
import { useState } from 'react';

export function useDelete() {
  const [isDeleting, setIsLoading] = useState(true);
  const [deleteError, setDeleteError] = useState(null);

  const removeDoctor = async (doctorId) => {
    try {
      const response = await DeleteDoctor({ id: doctorId });
      return true;
    } catch (error) {
      setDeleteError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeDoctor,
    isDeleting,
    deleteError,
  };
}

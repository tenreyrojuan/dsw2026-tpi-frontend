import { deleteSpecialty } from '../services/deleteSpecialty';
import { useState } from 'react';

export function useDelete(onSuccess) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const removeSpecialty = async (specialtyId) => {
    setIsDeleting(true);
    setDeleteError(null);

    const { error } = await deleteSpecialty(specialtyId);

    setIsDeleting(false);

    if (error) {
      setDeleteError(error);
      return false;
    }

    if (onSuccess) onSuccess(specialtyId);
    return true;
  };

  return {
    removeSpecialty,
    isDeleting,
    deleteError,
  };
}

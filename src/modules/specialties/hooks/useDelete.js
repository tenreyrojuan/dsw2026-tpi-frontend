import { useState } from 'react';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

export function useDelete({ deleteFn, errorMessages = {} }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const remove = async (id) => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteFn({ id });
      return true;
    } catch (error) {
      setDeleteError(parseBackendError(error, errorMessages));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    remove,
    isDeleting,
    deleteError,
  };
}

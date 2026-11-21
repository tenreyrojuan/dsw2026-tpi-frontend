import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { bookAppointment } from '../services/bookAppointment';
import { getPatientDni } from '../../auth/helpers/patientSession';
import { parseBackendError } from '../../shared/helpers/parseBackendError';
import { frontendErrorMessage } from '../helpers/backendError';

export function useBookAppointment() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { specialtyId: '', doctorId: '', slotId: '', reason: '' },
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // el horario se elige con botones, no con un input nativo
  useEffect(() => {
    register('slotId', { required: 'Seleccioná un horario disponible' });
  }, [register]);

  const [specialtyId, doctorId, slotId] = watch([
    'specialtyId',
    'doctorId',
    'slotId',
  ]);

  const clearSlot = () => setValue('slotId', '');

  const onSpecialtyChange = () => {
    setValue('doctorId', '');
    clearSlot();
  };

  const selectSlot = (id) => setValue('slotId', id, { shouldValidate: true });

  const onSubmit = async (data) => {
    setErrorMessage(null);

    const dni = getPatientDni();
    if (!dni) {
      setErrorMessage('No se encontró el DNI del paciente. Volvé a iniciar sesión');
      return;
    }

    try {
      const { appointment } = await bookAppointment({
        doctorId: data.doctorId,
        slotId: data.slotId,
        dni,
        reason: data.reason.trim(),
      });
      setAppointment(appointment);
      clearSlot();
      setValue('reason', '');
    } catch (error) {
      setErrorMessage(parseBackendError(error, frontendErrorMessage));
    } finally {
      setRefreshKey((key) => key + 1);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    errorMessage,
    appointment,
    closeAppointment: () => setAppointment(null),
    specialtyId,
    doctorId,
    slotId,
    selectSlot,
    clearSlot,
    onSpecialtyChange,
    refreshKey,
  };
}
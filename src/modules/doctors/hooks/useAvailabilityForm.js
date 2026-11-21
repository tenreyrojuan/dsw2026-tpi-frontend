import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addDoctorAvailability } from '../services/addDoctorAvailability';
import { fetchDoctorAvailabilities } from '../services/fetchDoctorAvailabilities';
import { frontendErrorMessage } from '../helpers/backendError';
import { parseBackendError } from '../../shared/helpers/parseBackendError';

const WEEK_DAYS = [
  { day: 'LUNES', label: 'Lunes' },
  { day: 'MARTES', label: 'Martes' },
  { day: 'MIÉRCOLES', label: 'Miércoles' },
  { day: 'JUEVES', label: 'Jueves' },
  { day: 'VIERNES', label: 'Viernes' },
  { day: 'SÁBADO', label: 'Sábado' },
];

// "HH:mm" -> "HH:mm:ss"
const toTime = (time) => `${time.slice(0, 5)}:00`;

function toFormDays(savedDays = []) {
  return WEEK_DAYS.map(({ day, label }) => {
    const saved = savedDays.find((item) => item.day === day);
    return {
      day,
      label,
      active: Boolean(saved),
      startTime: saved?.startTime ?? '',
      endTime: saved?.endTime ?? '',
    };
  });
}

export function useAvailabilityForm(doctorId) {
  const form = useForm({ defaultValues: { days: toFormDays() } });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { reset } = form;

  useEffect(() => {
    async function load() {
      try {
        const response = await fetchDoctorAvailabilities(doctorId);
        reset({ days: toFormDays(response.data) });
      } catch (error) {
        setErrorMessage(parseBackendError(error, frontendErrorMessage));
      }
    } load();
  }, [doctorId, reset]);

  const onSubmit = async ({ days }) => {
    try {
      await addDoctorAvailability(
        {
          doctorId,
          days: days
            .filter((d) => d.active)
            .map(({ day, startTime, endTime }) => ({
              day,
              startTime: toTime(startTime),
              endTime: toTime(endTime),
            })),
        });
      navigate(-1);
    } catch (error) {
      setErrorMessage(parseBackendError(error, frontendErrorMessage));
    }
  };

  return { ...form, errorMessage, onSubmit };
}

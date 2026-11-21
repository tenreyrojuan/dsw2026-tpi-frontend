import { useEffect, useMemo, useState } from 'react';
import { fetchDoctorSlots } from '../services/fetchDoctorSlots';
import { parseBackendError } from '../../shared/helpers/parseBackendError';
import { frontendErrorMessage } from '../helpers/backendError';
import {
  addDays,
  formatWeekLabel,
  getMonday,
  getWeekDays,
} from '../helpers/weekDates';

export function useWeekSlots(doctorId, refreshKey, onWeekChange) {
  const [firstMonday] = useState(() => getMonday());
  const [monday, setMonday] = useState(firstMonday);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const weekDays = useMemo(() => getWeekDays(monday), [monday]);
  const from = weekDays[0].isoDate;
  const to = weekDays[weekDays.length - 1].isoDate;

  useEffect(() => {
    if (!doctorId) return;

    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError('');

      try {
        const data = await fetchDoctorSlots({ doctorId, from, to });
        if (!ignore) setSlots(data.slots);
      } catch (error) {
        if (ignore) return;
        setSlots([]);
        setError(
          parseBackendError(
            error,
            frontendErrorMessage,
            'No se pudo obtener la disponibilidad'
          )
        );
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [doctorId, from, to, refreshKey]);

  // turnos futuros agrupados por fecha y ordenados por hora
  const slotsByDate = useMemo(() => {
    const grouped = {};
    if (!doctorId) return grouped;

    const now = new Date();
    slots
      .filter((slot) => new Date(`${slot.date}T${slot.time}:00`) > now)
      .sort((a, b) => a.time.localeCompare(b.time))
      .forEach((slot) => {
        (grouped[slot.date] ??= []).push(slot);
      });

    return grouped;
  }, [doctorId, slots]);

  const findSlot = (id) =>
    Object.values(slotsByDate)
      .flat()
      .find((slot) => slot.id === id);

  const changeWeek = (days) => {
    setMonday((current) => addDays(current, days));
    onWeekChange();
  };

  return {
    weekDays,
    weekLabel: formatWeekLabel(weekDays),
    canGoPrev: monday > firstMonday,
    goPrev: () => changeWeek(-7),
    goNext: () => changeWeek(7),
    slotsByDate,
    findSlot,
    isLoading,
    error,
  };
}
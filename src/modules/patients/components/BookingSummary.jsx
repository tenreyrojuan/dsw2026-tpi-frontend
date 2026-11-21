import { Calendar1, CircleCheck } from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import { formatLongDate } from '../helpers/weekDates';

function BookingSummary({
  doctor,
  slot,
  register,
  errors,
  isSubmitting,
  errorMessage,
}) {
  return (
    <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="border-l-4 border-med-primary-900 pl-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
            Resumen de Selección
          </span>
          {slot ? (
            <>
              <p className="text-base sm:text-lg font-bold text-med-primary-900 mt-0.5 flex items-center gap-2">
                <Calendar1 className="text-orange-600" />
                <span>
                  {formatLongDate(slot.date)}, {slot.time} HS
                </span>
              </p>
              <p className="text-xs text-med-text-sub mt-0.5">
                {doctor.name} • Duración: 30 min
              </p>
            </>
          ) : (
            <p className="text-sm text-med-text-sub mt-1">
              Seleccioná un horario disponible.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm shrink-0 disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Reservando...' : 'Confirmar Turno'}</span>
          <CircleCheck className="text-green-400" />
        </Button>
      </div>

      <Input
        label="Motivo de la consulta"
        placeholder="Ej. Control anual"
        {...register('reason', {
          required: 'El motivo es obligatorio',
          validate: (value) =>
            value.trim().length >= 5 ||
            'El motivo debe tener al menos 5 caracteres',
          maxLength: {
            value: 200,
            message: 'El motivo no puede superar los 200 caracteres',
          },
        })}
        error={errors.reason?.message}
      />

      {errors.slotId && (
        <p className="text-xs text-red-500 font-medium">
          {errors.slotId.message}
        </p>
      )}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default BookingSummary;
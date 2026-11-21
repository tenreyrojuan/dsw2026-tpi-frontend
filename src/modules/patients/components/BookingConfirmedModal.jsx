import { Check } from 'lucide-react';
import Button from '../../shared/components/Button';
import { formatLongDate } from '../helpers/weekDates';

function BookingConfirmedModal({
  appointment,
  doctor,
  onViewAppointments,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <Check />
        </div>
        <h3 className="text-xl font-bold text-med-primary-900">
          ¡Turno Confirmado con Éxito!
        </h3>
        <p className="text-xs text-med-text-sub mt-2 leading-relaxed">
          Tu turno con{' '}
          <strong className="text-med-text-main">{doctor?.name}</strong> fue
          reservado para el{' '}
          <strong className="text-med-text-main">
            {formatLongDate(appointment.date)} a las{' '}
            {String(appointment.startingTime).slice(0, 5)} hs
          </strong>
          .
        </p>

        <div className="mt-5 p-3.5 bg-med-primary-50 border border-med-primary-200/60 rounded-xl text-xs text-med-primary-900 text-left space-y-1">
          <p>
            <strong>Especialidad:</strong> {doctor?.specialty?.name}
          </p>
          <p>
            <strong>Paciente:</strong> {appointment.patientName}
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="w-full text-xs py-2.5" onClick={onViewAppointments}>
            Ver Mis Turnos
          </Button>
          <Button
            variant="secondary"
            className="w-full text-xs py-2.5"
            onClick={onClose}
          >
            Reservar Otro
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmedModal;
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Badge from '../../shared/components/Badge';

function AppointmentCard({ appointment, onCancel }) {
  return (
    <Card className="flex flex-col justify-between gap-4 p-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-med-primary-100 text-med-primary-700">
            {appointment.specialtyName}
          </Badge>
          <Badge className="bg-med-active-bg text-med-active-text">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Confirmado
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-med-primary-900">
          {appointment.doctorName}
        </h3>
        <p className="text-sm text-med-text-sub mt-2">
          Fecha:{' '}
          <strong className="text-med-text-main font-semibold">
            {appointment.date}
          </strong>{' '}
          a las{' '}
          <strong className="text-med-text-main font-semibold">
            {String(appointment.startingTime).slice(0, 5)} hs
          </strong>
        </p>
      </div>
      <div className="flex gap-2 pt-3 border-t border-med-border">
        <Button
          variant="outline"
          className="w-full text-xs"
          onClick={() => onCancel(appointment.id)}
        >
          Cancelar Turno
        </Button>
      </div>
    </Card>
  );
}

export default AppointmentCard;

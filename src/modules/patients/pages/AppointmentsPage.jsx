import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import { usePatientAppointments } from '../hooks/usePatientAppointments';
import { Plus } from 'lucide-react';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { appointments, isLoading, error, cancel } = usePatientAppointments();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Mis Turnos Médicos
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Consulta y gestiona las citas médicas programadas.
          </p>
        </div>
        <Button 
        onClick={() => navigate('/')}
        className='flex items-center gap-1 hover:bg-med-primary-800'>
          <Plus size={20}/>
           Solicitar Nuevo Turno
        </Button>
      </div>

      {isLoading && <Loading />}
      {!isLoading && <ErrorMessage message={error} />}
      {!isLoading && !error && appointments.length === 0 && (
        <p className="text-sm text-med-text-sub">No tenés turnos programados.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {!isLoading && appointments.map((appt) => (
          <Card
            key={appt.id}
            className="flex flex-col justify-between gap-4 p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-med-primary-100 text-med-primary-700">
                  {appt.specialtyName}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-med-active-bg text-med-active-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Confirmado
                </span>
              </div>
              <h3 className="text-lg font-bold text-med-primary-900">
                {appt.doctorName}
              </h3>
              <p className="text-sm text-med-text-sub mt-2">
                Fecha:{' '}
                <strong className="text-med-text-main font-semibold">
                  {appt.date}
                </strong>{' '}
                a las{' '}
                <strong className="text-med-text-main font-semibold">
                  {String(appt.startingTime).slice(0, 5)} hs
                </strong>
              </p>
            </div>
            <div className="flex gap-2 pt-3 border-t border-med-border">
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => cancel(appt.id)}
              >
                Cancelar Turno
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;

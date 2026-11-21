import { useNavigate } from 'react-router-dom';
import { Header } from '../../shared/components/Header';
import Button from '../../shared/components/Button';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';
import AppointmentCard from '../components/AppointmentCard';
import { usePatientAppointments } from '../hooks/usePatientAppointments';
import { Plus } from 'lucide-react';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { appointments, isLoading, error, cancel } = usePatientAppointments();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Header
          title="Mis Turnos Médicos"
          subtitle="Consulta y gestiona las citas médicas programadas."
        />
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
          <AppointmentCard key={appt.id} appointment={appt} onCancel={cancel} />
        ))}
      </div>
    </div>
  );
}

export default AppointmentsPage;

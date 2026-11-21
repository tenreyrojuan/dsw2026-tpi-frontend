import { useForm } from 'react-hook-form';
import { Header } from '../../shared/components/Header';
import { useDoctors } from '../../doctors/hooks/useDoctors';
import { useSpecialties } from '../../doctors/hooks/useSpecialties';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentsFilters } from '../components/AppointmentsFilters';
import { AppointmentsTable } from '../components/AppointmentsTable';

function AppointmentsSearchPage() {
  const { register, handleSubmit } = useForm();

  const { doctors } = useDoctors({ pageSize: 100 });
  const { specialties } = useSpecialties();

  const { appointments, isLoading, error, pagination, applyFilters } =
    useAppointments();

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Búsqueda y Filtrado de Citas"
        subtitle="Gestione y supervise el flujo de pacientes del departamento."
      />

        <AppointmentsFilters
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={applyFilters}
          specialties={specialties}
          doctors={doctors}
        />

      <AppointmentsTable
        appointments={appointments}
        isLoading={isLoading}
        error={error}
        pagination={pagination}
      />
    </div>
  );
}

export default AppointmentsSearchPage;

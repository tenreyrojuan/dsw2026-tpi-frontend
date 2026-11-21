import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { Header } from '../../shared/components/Header';
import CardHeader from '../../shared/components/CardHeader';
import Searchbar from '../../shared/components/Searchbar';
import StatCard from '../components/StatCard';
import { useStats } from '../hooks/useStats';
import { useDoctors } from '../../doctors/hooks/useDoctors';
import DoctorsTable from '../../doctors/components/DoctorsTable';
import { Stethoscope, LayoutGrid, CalendarCheck, Plus } from 'lucide-react';

function OverviewPage() {
  const navigate = useNavigate();

  const { stats, isLoading: isLoadingStats, error: statsError } = useStats();

  const {
    doctors,
    onSearchTermChange,
    isLoading,
    error,
    pagination,
    totalDoctors,
  } = useDoctors({ pageSize: 5 });

  const statValue = (value) =>
    isLoadingStats ? '...' : statsError ? '-' : value;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Header
          title="Vista General de Gestión"
          subtitle="Configure el personal médico y las especialidades del departamento."
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => navigate('/admin/doctors')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nuevo Doctor</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/admin/specialties')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nueva Especialidad</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={Stethoscope}
          label="Doctores Activos"
          value={statValue(stats?.activeDoctors)}
        />
        <StatCard
          icon={LayoutGrid}
          label="Especialidades Activas"
          value={statValue(stats?.activeSpecialties)}
        />
        <StatCard
          icon={CalendarCheck}
          label="Turnos Confirmados Para Hoy"
          value={statValue(stats?.bookedAppointmentsToday)}
        />
      </div>

      {/* Directorio de Profesionales Médicos (Tabla Resumen) */}
      <Card className="p-0 overflow-hidden border-med-border">
        <CardHeader title="Directorio de Profesionales Médicos">
          <Searchbar
            placeholder="Buscar por nombre..."
            className="w-full sm:w-72"
            onChange={onSearchTermChange}
          />
        </CardHeader>

        <DoctorsTable
          doctors={doctors}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          totalItems={totalDoctors}
          showId={false}
          renderActions={() => (
            <button
              type="button"
              className="ml-auto text-xs font-semibold text-med-primary-700 hover:text-med-primary-900"
              onClick={() => navigate('/admin/doctors')}
            >
              Ver Detalle
            </button>
          )}
        />
      </Card>
    </div>
  );
}

export default OverviewPage;

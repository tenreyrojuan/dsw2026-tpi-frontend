import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { useStats } from '../hooks/useStats';
import { useDoctors } from '../../doctors/hooks/useDoctors';
import DoctorsTable from '../../doctors/components/DoctorsTable';
import { Stethoscope, LayoutGrid, CalendarCheck, Search } from 'lucide-react';

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

  return (
    <div className="flex flex-col gap-8">
      {/* Header con Título y Acciones Principales */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Vista General de Gestión
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Configure el personal médico y las especialidades del departamento.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => navigate('/admin/doctors')}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar Nuevo Doctor</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/admin/specialties')}
            className="flex items-center gap-2"
          >
            <span>+</span>
            <span>Agregar Nueva Especialidad</span>
          </Button>
        </div>
      </div>

      {/* Tarjetas de Métricas de la Imagen 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Doctores Activos */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Doctores Activos
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
              {isLoadingStats ? '...' : statsError ? '-' : stats.activeDoctors}
            </p>
          </div>
        </Card>

        {/* Especialidades Activas */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
              <LayoutGrid className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Especialidades Activas
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
              {isLoadingStats
                ? '...'
                : statsError
                  ? '-'
                  : stats.activeSpecialties}
            </p>
          </div>
        </Card>

        {/* Turnos Confirmados para Hoy */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Turnos Confirmados Para Hoy
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
              {isLoadingStats
                ? '...'
                : statsError
                  ? '-'
                  : stats.bookedAppointmentsToday}
            </p>
          </div>
        </Card>
      </div>

      {/* Directorio de Profesionales Médicos (Tabla Resumen) */}
      <Card className="p-0 overflow-hidden border-med-border">
        {/* Cabecera de la tabla con Buscador */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Directorio de Profesionales Médicos
          </h2>
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-med-text-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-med-primary-50/70 border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
              onChange={onSearchTermChange}
            />
          </div>
        </div>

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

import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { useStats } from '../hooks/useStats';
import Table from '../../shared/components/Table';
import Loading from '../../shared/components/Loading';
import { useDoctorsDirectory } from '../hooks/useDoctorsDirectory';
import { Stethoscope, LayoutGrid, CalendarCheck, Search } from 'lucide-react';

function OverviewPage() {
  const navigate = useNavigate();

const { stats, isLoading: isLoadingStats, error: statsError } = useStats();

  const { filteredDoctors, searchTerm, setSearchTerm, isLoading, error, pagination, totalDoctors } =
    useDoctorsDirectory();

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
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-med-active-bg text-med-active-text">
              +4 este mes
            </span>
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
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
              Estable
            </span>
          </div>

          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Especialidades Activas
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
              {isLoadingStats ? '...' : statsError ? '-' : stats.activeSpecialties}
            </p>
          </div>
        </Card>

        {/* Turnos Confirmados para Hoy */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-med-primary-100 text-med-primary-700">
              Hoy
            </span>
          </div>

          <div className="mt-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
              Turnos Confirmados Para Hoy
            </span>
            <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
              {isLoadingStats ? '...' : statsError ? '-' : stats.bookedAppointmentsToday}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <Table
            pageSize={10}
            error={error}
            data={filteredDoctors}
            columns={[
              {
                key: 'name',
                label: 'Nombre del Doctor',
                render: (d) => (
                  <>
                    <span className="w-9 h-9 rounded-full bg-med-primary-100 flex items-center justify-center text-sm font-semibold text-med-primary-700">
                      {d.name.charAt(0)}
                    </span>
                    <span className="font-semibold text-med-primary-900">
                      {d.name}
                    </span>
                  </>
                ),
              },
              {
                key: 'specialty',
                label: 'Especialidad',
                render: (d) => d.specialty?.name,
              },
              {
                key: 'actions',
                label: 'Acciones',
                render: () => (
                  <button
                    type="button"
                    className="text-xs font-semibold text-med-primary-700 hover:text-med-primary-900"
                    onClick={() => navigate('/admin/doctors')}
                  >
                    Ver Detalle
                  </button>
                ),
              },
            ]}
            pagination={pagination}
          />
        )}
      </Card>
    </div>
  );
}

export default OverviewPage;

import Card from '../../shared/components/Card';
import { Search } from 'lucide-react';
import Table from '../../shared/components/Table';
import TableActions from '../../shared/components/TableActions';
import Actions from '../components/Actions';
import { useDelete } from '../hooks/useDelete';
import { useSpecialties } from '../hooks/useSpecialties';

function SpecialtiesPage() {
  const {
    filteredSpecialties,
    reloadSpecialties,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
  } = useSpecialties();

  const { removeSpecialty, deleteError } = useDelete(() => {
    reloadSpecialties();
  });

  const tableData = filteredSpecialties.map((spec) => ({
    ...spec,
    actions: (
      <TableActions
        editTitle={`Editar ${spec.name}`}
        deleteTitle={`Eliminar ${spec.name}`}
        onEdit={() => alert(`Editar especialidad ${spec.name}`)}
        onDelete={() => removeSpecialty(spec.id)}
      />
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera con Título, Buscador y Botón */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Directorio de Especialidades
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Administre las categorías médicas, servicios y disponibilidad del
            personal especializado.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-med-text-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Buscar especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
          </div>

          {/*Nueva Especialidad */}
          <Actions />
        </div>
      </div>

      {/* Tabla*/}
      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de Especialidades
          </h2>
        </div>
        <Table
          columns={[
            { key: 'name', label: 'Nombre de la Especialidad' },
            { key: 'description', label: 'Descripción' },
            { key: 'actions', label: 'Acciones' },
          ]}
          data={tableData}
        />
      </Card>
    </div>
  );
}

export default SpecialtiesPage;
import Loading from '../../shared/components/Loading';
import Table from '../../shared/components/Table';
import TableActions from '../../shared/components/TableActions';
import { frontendErrorMessage } from '../helpers/backendError';
import { deleteSpecialty } from '../services/deleteSpecialty';
import { useDelete } from '../hooks/useDelete';

const columns = [
  { key: 'name', label: 'Nombre de la Especialidad', className: 'w-1/4' },
  { key: 'description', label: 'Descripción', className: 'w-2/4' },
  { key: 'actions', label: 'Acciones', className: 'w-1/4 text-right' },
];

export default function SpecialtiesTable({
  filteredSpecialties,
  isLoading,
  error,
  pagination,
  onDeleted,
}) {
  
const { remove: removeSpecialty, isDeleting, deleteError } = useDelete({
    deleteFn: deleteSpecialty,
    errorMessages: frontendErrorMessage,
    onSuccess: onDeleted,
  });

  const handleDelete = async (spec) => {
    if(isDeleting) return;
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar la especialidad "${spec.name}"?`
    );
    if (confirmed) {
      const ok = await removeSpecialty(spec.id);
      if(ok && onDeleted) onDeleted();
    }
  };

  const tableData = filteredSpecialties.map((spec) => ({
    ...spec,
    actions: (
      <TableActions
        editTitle={`Editar ${spec.name}`}
        deleteTitle={`Eliminar ${spec.name}`}
        onEdit={() => alert(`Editar especialidad ${spec.name}`)}
        onDelete={() => handleDelete(spec)}
      />
    ),
  }));

  if (isLoading) return <Loading />;

  return (
    <>
      {deleteError && (
        <div className="m-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
          {deleteError}
        </div>
      )}

      <Table
        columns={columns}
        data={tableData}
        error={error}
        pagination={pagination}
      />
    </>
  );
}
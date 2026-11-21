import Loading from '../../shared/components/Loading';
import Table from '../../shared/components/Table';
import ErrorMessage from '../../shared/components/ErrorMessage';
import TableActions from '../../shared/components/TableActions';

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
  totalItems,
  onDelete,
  deleteError,
}) {
  const tableData = filteredSpecialties.map((spec) => ({
    ...spec,
    actions: (
      <TableActions
        editTitle={`Editar ${spec.name}`}
        deleteTitle={`Eliminar ${spec.name}`}
        onEdit={() => alert(`Editar especialidad ${spec.name}`)}
        onDelete={() => onDelete(spec)}
      />
    ),
  }));

  if (isLoading) return <Loading />;

  return (
    <>
      {deleteError && (
        <div className="m-4">
          <ErrorMessage message={deleteError} />
        </div>
      )}

      <Table
        columns={columns}
        data={tableData}
        error={error}
        pagination={pagination}
        totalItems={totalItems}
      />
    </>
  );
}
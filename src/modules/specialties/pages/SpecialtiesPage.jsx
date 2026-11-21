import Card from '../../shared/components/Card';
import CardHeader from '../../shared/components/CardHeader';
import SpecialtyHeader from '../components/SpecialtyHeader';
import SpecialtiesTable from '../components/SpecialtiesTable';
import { useSpecialties } from '../hooks/useSpecialties';
import { useDelete } from '../hooks/useDelete';
import { deleteSpecialty } from '../services/deleteSpecialty';
import { frontendErrorMessage } from '../helpers/backendError';

function SpecialtiesPage() {
  const {
    filteredSpecialties,
    reloadSpecialties,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    totalSpecialties,
    pagination,
  } = useSpecialties();

  const { remove: removeSpecialty, isDeleting, deleteError } = useDelete({
    deleteFn: deleteSpecialty,
    errorMessages: frontendErrorMessage,
  });

  const handleDelete = async (spec) => {
    if (isDeleting) return;

    const confirmed = window.confirm(
      `¿Seguro que querés eliminar la especialidad "${spec.name}"?`
    );

    if (confirmed && (await removeSpecialty(spec.id))) reloadSpecialties();
  };

  return (
    <div className="flex flex-col gap-6">
      <SpecialtyHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Card className="p-0 overflow-hidden border-med-border">
        <CardHeader title="Registros de Especialidades" />

        <SpecialtiesTable
          filteredSpecialties={filteredSpecialties}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          totalItems={totalSpecialties}
          onDelete={handleDelete}
          deleteError={deleteError}
        />
      </Card>
    </div>
  );
}

export default SpecialtiesPage;

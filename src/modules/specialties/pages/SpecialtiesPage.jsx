import Card from '../../shared/components/Card';
import SpecialtyHeader from '../components/SpecialtyHeader';
import SpecialtiesTable from '../components/SpecialtiesTable';
import { useSpecialties } from '../hooks/useSpecialties';

function SpecialtiesPage() {
  const {
    filteredSpecialties,
    totalSpecialties,
    reloadSpecialties,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    pagination,
  } = useSpecialties();

  return (
    <div className="flex flex-col gap-6">
      <SpecialtyHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de Especialidades
          </h2>
        </div>

        <SpecialtiesTable
          filteredSpecialties={filteredSpecialties}
          totalSpecialties={totalSpecialties}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onDeleted={reloadSpecialties}
        />
      </Card>
    </div>
  );
}

export default SpecialtiesPage;
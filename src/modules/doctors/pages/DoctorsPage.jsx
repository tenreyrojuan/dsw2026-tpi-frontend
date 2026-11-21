import DoctorHeader from '../components/DoctorHeader';
import { useDoctors } from '../hooks/useDoctors';
import DoctorsTable from '../components/DoctorsTable';
import Card from '../../shared/components/Card';
import TableHeader from '../components/TableHeader';
import { useDelete } from '../hooks/useDelete';
import TableActions from '../components/TableActions';

function DoctorsPage() {
  const {
    doctors,
    totalDoctors,
    onSearchTermChange,
    isLoading,
    error,
    pagination,
  } = useDoctors();

  const { removeDoctor } = useDelete();

  return (
    <div className="flex flex-col gap-6">
      <DoctorHeader onSearchTermChange={onSearchTermChange} />

      <Card className="p-0 overflow-hidden border-med-border">
        <TableHeader />

        <DoctorsTable
          doctors={doctors}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          totalItems={totalDoctors}
          renderActions={(doc) => (
            <TableActions doctor={doc} removeDoctor={removeDoctor} />
          )}
        />
      </Card>
    </div>
  );
}

export default DoctorsPage;

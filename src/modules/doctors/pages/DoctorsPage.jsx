import DoctorHeader from '../components/DoctorHeader';
import { useDoctors } from '../hooks/useDoctors';
import DoctorsTable from '../components/DoctorsTable';
import TablePagination from '../../shared/components/TablePagination';
import Card from '../../shared/components/Card';
import TableHeader from '../components/TableHeader';

function DoctorsPage() {

  const {
    doctors,
    totalDoctors,
    onSearchTermChange,
    isLoading,
    error,
    pagination
  } = useDoctors();

  return (
    <div className="flex flex-col gap-6">
      <DoctorHeader onSearchTermChange={onSearchTermChange} />

      <Card className="p-0 overflow-hidden border-med-border">

        <TableHeader />

        <DoctorsTable
          doctors={doctors}
          totalDoctors={totalDoctors}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          totalItems={totalDoctors}
        />

      </Card>

    </div>
  );
}

export default DoctorsPage;

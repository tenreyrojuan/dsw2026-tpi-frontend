import DoctorHeader from '../components/DoctorHeader';
import { useDoctors } from '../hooks/useDoctors';
import DoctorsTable from '../components/DoctorsTable';
import TablePagination from '../../shared/components/TablePagination';
import Card from '../../shared/components/Card';
import TableHeader from '../components/TableHeader';

function DoctorsPage() {
  
  const { 
    filteredDoctors, 
    totalDoctors, 
    searchTerm, 
    setSearchTerm, 
    isLoading, 
    error,
    pagination
  } = useDoctors();

  return (
    <div className="flex flex-col gap-6">
      <DoctorHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      <Card className="p-0 overflow-hidden border-med-border">
        
        <TableHeader />

        <DoctorsTable 
        filteredDoctors={filteredDoctors} 
        totalDoctors={totalDoctors} 
        isLoading={isLoading} 
        error={error} 
        pagination={pagination}
        />

        <TablePagination 
        from={pagination.from} 
        to={pagination.to} 
        onPageChange={pagination.onPageChange}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={totalDoctors}
        />
        
      </Card>

    </div>
  );
}

export default DoctorsPage;

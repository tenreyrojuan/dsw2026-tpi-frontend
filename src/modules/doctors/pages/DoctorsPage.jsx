import DoctorHeader from '../components/DoctorHeader';
import { useDoctors } from '../hooks/useDoctors';
import DoctorsTable from '../components/DoctorsTable';

function DoctorsPage() {
  
  const { filteredDoctors, searchTerm, setSearchTerm } = useDoctors();

  return (
    <div className="flex flex-col gap-6">
      <DoctorHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

      {/* Tabla Principal */}
      <DoctorsTable filteredDoctors={filteredDoctors} />
    </div>
  );
}

export default DoctorsPage;

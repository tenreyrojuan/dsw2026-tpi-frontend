import DoctorHeader from '../components/DoctorHeader';
import { useDoctors } from '../hooks/useDoctors';
import DoctorsTable from '../components/DoctorsTable';
import Card from '../../shared/components/Card';
import ErrorMessage from '../../shared/components/ErrorMessage';
import CardHeader from '../../shared/components/CardHeader';
import { useDelete } from '../hooks/useDelete';
import TableActions from '../../shared/components/TableActions';
import { useNavigate } from 'react-router-dom';

function DoctorsPage() {
  const navigate = useNavigate();

  const {
    doctors,
    totalDoctors,
    onSearchTermChange,
    isLoading,
    error,
    pagination,
    reload,
  } = useDoctors();

  const { removeDoctor, deleteError } = useDelete();

  const handleDelete = async (doctor) => {
    const confirmed = window.confirm(
      `Estas seguro que deseas eliminar a ${doctor.name}`
    );

    if (confirmed && (await removeDoctor(doctor.id))) reload();
  };

  return (
    <div className="flex flex-col gap-6">
      <DoctorHeader onSearchTermChange={onSearchTermChange} />

      <Card className="p-0 overflow-hidden border-med-border">
        <CardHeader title="Registros de Doctores" />

        {deleteError && (
          <div className="m-4">
            <ErrorMessage message={deleteError} />
          </div>
        )}

        <DoctorsTable
          doctors={doctors}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          totalItems={totalDoctors}
          renderActions={(doc) => (
            <TableActions
              onView={() => alert(`Ver detalle de ${doc.name}`)}
              onEdit={() => navigate('update')}
              onDelete={() => handleDelete(doc)}
              editTitle="Editar profesional"
              deleteTitle="Eliminar profesional"
            />
          )}
        />
      </Card>
    </div>
  );
}

export default DoctorsPage;

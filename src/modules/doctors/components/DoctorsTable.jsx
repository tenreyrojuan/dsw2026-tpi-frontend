import Loading from '../../shared/components/Loading';
import { useDelete } from '../hooks/useDelete';
import TableActions from './TableActions';
import Table from '../../shared/components/Table';

{/* Tabla Principal */ }
export default function DoctorsTable({ doctors, isLoading, pagination, totalItems, error }) {

  const { removeDoctor, isDeleting, deleteError } = useDelete();

  return (
    isLoading
      ?
      <Loading />
      :
      <Table
        columns={[
          {
            key: 'name',
            label: 'nombre del doctor',
            render: (doc) => (
              <div className='flex flex-col gap-0.5 text-[15px]'>
                <strong className='text-blue-900'>
                  {doc.name}
                </strong>
                <span className='text-gray-400'>
                  ID: {doc.licenseNumber}
                </span>
              </div>
            )
          },
          {
            key: 'specialty',
            label: 'especialidad',
            render: (doc) => (
              <div className='flex flex-col gap-0.5 p-2 bg-sky-100 rounded-full text-[15px]'>
                <strong className='text-blue-900'>{doc.specialty.name}</strong>
              </div>

            )
          },
          {
            key: 'actions',
            label: 'acciones',
            className: 'text-right',
            render: (doc) => (
              <TableActions doctor={doc} removeDoctor={removeDoctor} />
            )
          }
        ]}
        data={doctors}
        pagination={pagination}
        totalItems={totalItems}
      />
  );
}
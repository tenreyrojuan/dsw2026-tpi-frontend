import Loading from '../../shared/components/Loading';
import Table from '../../shared/components/Table';

export default function DoctorsTable({
  doctors,
  isLoading,
  error,
  pagination,
  totalItems,
  showId = true,
  renderActions,
}) {
  const columns = [
    {
      key: 'name',
      label: 'nombre del doctor',
      render: (doc) => (
        <div className="flex flex-col gap-0.5 text-[15px]">
          <strong className="text-blue-900">{doc.name}</strong>
          {showId && (
            <span className="text-gray-400">ID: {doc.licenseNumber}</span>
          )}
        </div>
      ),
    },
    {
      key: 'specialty',
      label: 'especialidad',
      render: (doc) => (
        <div className="flex flex-col gap-0.5 p-2 bg-sky-100 rounded-full text-[15px]">
          <strong className="text-blue-900">{doc.specialty.name}</strong>
        </div>
      ),
    },
    ...(renderActions
      ? [
          {
            key: 'actions',
            label: 'acciones',
            className: 'text-right',
            render: renderActions,
          },
        ]
      : []),
  ];

  if (isLoading) return <Loading />;

  return (
    <Table
      columns={columns}
      data={doctors}
      error={error}
      pagination={pagination}
      totalItems={totalItems}
    />
  );
}

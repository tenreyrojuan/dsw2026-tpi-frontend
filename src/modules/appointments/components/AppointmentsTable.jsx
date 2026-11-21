import Card from '../../shared/components/Card';
import Loading from '../../shared/components/Loading';
import Table from '../../shared/components/Table';

const STATUS_STYLES = {
  CONFIRMADO: 'bg-med-active-bg text-med-active-text',
  COMPLETADO: 'bg-med-primary-100 text-med-primary-700',
  CANCELADO: 'bg-med-danger-bg text-med-danger-text',
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-med-text-sub';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}

const columns = [
  {
    key: 'date',
    label: 'Fecha',
    render: ({ date, time }) => (
      <div className="flex flex-col">
        <strong>{date}</strong>
        <span className="text-med-text-muted">{time}</span>
      </div>
    ),
  },
  {
    key: 'department',
    label: 'Departamento',
    render: ({ department, doctor }) => (
      <div className="flex flex-col">
        <strong>{department}</strong>
        <span className="text-med-text-muted">{doctor}</span>
      </div>
    ),
  },
  { key: 'patient', label: 'Paciente' },
  {
    key: 'status',
    label: 'Estado',
    render: ({ status }) => <StatusBadge status={status} />,
  },
];

export function AppointmentsTable({
  appointments,
  isLoading,
  error,
  pagination,
}) {
  return (
    <Card className="p-0 overflow-hidden">
      <h2 className="p-5 text-base font-bold text-med-primary-900 border-b border-med-border">
        Registros de Citas
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          data={appointments}
          error={error}
          pagination={pagination}
          totalItems={pagination.totalItems}
        />
      )}
    </Card>
  );
}

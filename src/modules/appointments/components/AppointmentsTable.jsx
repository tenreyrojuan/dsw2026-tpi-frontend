import Card from '../../shared/components/Card';
import Loading from '../../shared/components/Loading';
import Table from '../../shared/components/Table';

const STATUS_STYLES = {
  BOOKED: {
    label: 'CONFIRMADO',
    style: 'bg-med-active-bg text-med-active-text',
  },
  ATTENDED: {
    label: 'COMPLETADO',
    style: 'bg-med-primary-100 text-med-primary-700',
  },
  CANCELLED: {
    label: 'CANCELADO',
    style: 'bg-med-danger-bg text-med-danger-text',
  },
  NO_SHOW: {
    label: 'AUSENTE',
    style: 'bg-med-leave-bg text-med-leave-text',
  },
};

function StatusBadge({ status }) {
  const { label = status, style = 'bg-gray-100 text-med-text-sub' } =
    STATUS_STYLES[status] ?? {};

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {label}
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

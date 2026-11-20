import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import Table from '../../shared/components/Table';
import FormButtons from '../../shared/components/FormButtons';
import { useAvailabilityForm } from '../hooks/useAvailabilityForm';
import { Clock4 } from 'lucide-react';

export default function AvailabilityForm({ doctorId }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    errorMessage,
    onSubmit,
  } = useAvailabilityForm(doctorId);

  const timeInput = (field, { index, active }) => (
    <Input
      type="time"
      disabled={!active}
      error={errors.days?.[index]?.[field]?.message}
      {...register(`days.${index}.${field}`, {
        required: active && 'Requerido',
      })}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='bg-white rounded-lg'>
        <section className="flex justify-between px-6 py-4">
          <h4>Configuración de horarios</h4>
          <div className='flex items-center gap-2'>
            <Clock4 size={16} />
            <p className="text-sm text-gray-500">
              Intervalos automáticos de 30 minutos
            </p>
          </div>
        </section>
        {errorMessage && (
          <strong className="text-red-600">{errorMessage}</strong>
        )}
        <Table
          columns={[
            { key: 'label', label: 'Día' },
            {
              key: 'active',
              label: 'Estado',
              render: ({ index, active }) => (
                <label className="flex gap-2">
                  <input type="checkbox" {...register(`days.${index}.active`)} />
                  {active ? 'Activo' : 'Inactivo'}
                </label>
              ),
            },
            {
              key: 'startTime',
              label: 'Entrada',
              render: (row) => timeInput('startTime', row),
            },
            {
              key: 'endTime',
              label: 'Salida',
              render: (row) => timeInput('endTime', row),
            },
          ]}
          data={watch('days').map((d, index) => ({ ...d, index }))}
          paginated={false}
        />
        <FormButtons
          label="Guardar Disponibilidad"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

import { Filter } from 'lucide-react';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import Button from '../../shared/components/Button';

export function AppointmentsFilters({
  register,
  handleSubmit,
  onSubmit,
  specialties,
  doctors,
}) {
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2 className="pb-4 text-base font-bold text-med-primary-900 border-b border-med-border-subtle">
          Criterios de Búsqueda
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <Input
            label="Nombre o DNI del Paciente"
            placeholder="Nombre o DNI..."
            {...register('searchTerm')}
          />
          <Select label="Especialidad" {...register('specialtyId')}>
            <option value="">Todas las Especialidades</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </Select>
          <Select label="Doctor" {...register('doctorId')}>
            <option value="">Todos los Doctores</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </Select>
          <Input label="Fecha" type="date" {...register('date')} />
          <Button
            type="submit"
            className="flex items-center justify-center gap-2"
          >
            <Filter size={16} />
            Aplicar Filtros
          </Button>
        </div>
      </form>
    </Card>
  );
}

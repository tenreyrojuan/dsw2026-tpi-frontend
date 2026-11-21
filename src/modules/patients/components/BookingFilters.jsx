import Select from '../../shared/components/Select';
import ErrorMessage from '../../shared/components/ErrorMessage';

function BookingFilters({
  register,
  errors,
  specialties,
  doctors,
  specialtyId,
  onSpecialtyChange,
  onDoctorChange,
  error,
}) {
  //const withoutDoctors = Boolean(specialtyId) && doctors.length === 0;
  const withoutDoctors = Boolean(specialtyId) && doctors.length === 0;

  const doctorPlaceholder = !specialtyId
    ? 'Primero elegí una especialidad'
    : withoutDoctors
      ? 'Sin médicos disponibles'
      : 'Elegí un médico';
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Seleccionar Especialidad"
          placeholder="Elegí una especialidad"
          data={specialties}
          optionName="name"
          {...register('specialtyId', {
            required: 'Seleccioná una especialidad',
            onChange: onSpecialtyChange,
          })}
          error={errors.specialtyId?.message}
        />
                <Select
          key={specialtyId}
          label="Seleccionar Doctor"
          placeholder={doctorPlaceholder}
          data={doctors}
          optionName="name"
          {...register('doctorId', {
            required: 'Seleccioná un médico',
            onChange: onDoctorChange,
          })}
          error={errors.doctorId?.message}
        />
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}

export default BookingFilters;
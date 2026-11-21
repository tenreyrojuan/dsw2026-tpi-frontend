import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import ErrorMessage from '../../shared/components/ErrorMessage';
import Buttons from './AddDoctorFormButtons';

export function AddDoctorForm({
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    errorMessage,
    specialties
  } ) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6">
      <ErrorMessage message={errorMessage} />
      <fieldset
        disabled={isSubmitting}
        className="flex flex-col gap-4 border-b border-gray-300 pb-6"
      >
        <Input
          label={'Nombre Completo del Doctor'}
          placeholder={'Ej. Dr. Alejandro Dominguez'}
          {...register('name', {
            required: 'El Nombre es Obligatorio',
            minLength: {
              value: 3,
              message: 'El nombre debe tener 3 caracteres o más',
            },
            maxLength: {
              value: 100,
              message: 'El nombre debe tener hasta 100 caracteres',
            },
          })}
          error={errors.name?.message}
        />
        <div className="flex flex-1 w-full gap-10 items-center">
          <Select
            label={'Especialidad'}
            data={specialties}
            optionName={'name'}
            placeholder="Seleccione especialidad"
            {...register('specialtyId', {
              required: 'El medico debe llevar una especialidad',
            })}
            error={errors.specialtyId?.message}
          />
          <div className="w-full">
            <Input
              label={'Número de Licencia Médica'}
              placeholder={'ID-45920-X'}
              {...register('licenseNumber', {
                required: 'La Licencia es Obligatoria',
              })}
              error={errors.licenseNumber?.message}
            />
          </div>
        </div>
      </fieldset>
      <div className="flex w-full justify-end p-4 gap-4">
        <Buttons isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}

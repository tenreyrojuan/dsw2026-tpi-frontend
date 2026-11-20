import Loading from '../../shared/components/Loading';
import { useDoctorForm } from '../hooks/useDoctorForm';
import { useSpecialties } from '../hooks/useSpecialties';
import { AddDoctorFormHeader } from '../components/AddDoctorFormHeader';
import { AddDoctorForm } from '../components/AddDoctorForm';

export function AddDoctorPage() {

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    errorMessage,
  } = useDoctorForm();


  const { isLoading, specialties } = useSpecialties();

  return (
    <div className="flex flex-col gap-6 text-blue-900">
      <h2>
        Doctors {'>'} <strong>Agregar Nuevo Doctor</strong>
      </h2>

      <div className="rounded-lg border border-gray-300 overflow-hidden">
        <AddDoctorFormHeader />


        {isLoading ? (
          <Loading />
        ) : (
          <AddDoctorForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
            specialties={specialties}
          />
        )}
      </div>
    </div>
  );
}


import { useAddSpecialty } from '../hooks/useAddSpecialty';
import { AddSpecialtyFormHeader } from '../components/AddSpecialtyFormHeader';
import { AddSpecialtyForm } from '../components/AddSpecialtyForm';

export default function AddSpecialtyPage() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    errorMessage,
    onSubmit,
    onCancel,
  } = useAddSpecialty();

  return (
    <div className="flex flex-col gap-6">
      <AddSpecialtyFormHeader onNavigateBack={onCancel} />

      <AddSpecialtyForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onCancel={onCancel}
        errorMessage={errorMessage}
      />
    </div>
  );
}
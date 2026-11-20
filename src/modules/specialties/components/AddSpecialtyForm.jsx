import { Save } from 'lucide-react';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

export function AddSpecialtyForm({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
  errorMessage,
}) {
  return (
    <Card className="p-6 border-med-border rounded-xs">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Input
            label={'Nombre de la Especialidad'}
            placeholder={'Ej. Cardiología Intervencionista'}
            {...register('name', {
              required: 'El nombre de la especialidad es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres.',
              },
              maxLength: {
                value: 100,
                message: 'El nombre no puede superar los 100 caracteres.',
              },
            })}
            error={errors.name?.message}
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold text-med-text-main">
            Descripción
          </label>
          <textarea
            rows={5}
            placeholder="Detalle el alcance de la especialidad, procedimientos principales y requisitos de derivación..."
            {...register('description', {
              required: 'La descripción es obligatoria',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres.',
              },
              maxLength: {
                value: 100,
                message: 'La descripción no puede superar los 100 caracteres.',
              },
            })}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted transition focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent resize-none ${
              errors.description
                ? 'border-red-400 bg-red-50/20'
                : 'border-med-border'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-med-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm text-med-primary-900 border-slate-600 rounded-md"
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 rounded-xs bg-med-primary-900 hover:bg-med-primary-800 text-white font-medium disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isSubmitting ? 'Guardando...' : 'Guardar Especialidad'}</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
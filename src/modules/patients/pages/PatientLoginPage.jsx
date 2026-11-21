import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';
import ErrorMessage from '../../shared/components/ErrorMessage';
import BrandHeader from '../../shared/components/BrandHeader';
import Input from '../../shared/components/Input';
import { usePatientLogin } from '../hooks/usePatientLogin';
import { ArrowRight, IdCard, Mail } from 'lucide-react';

function PatientLoginPage() {
  const { register, handleSubmit, errors, onSubmit, errorMessage } =
    usePatientLogin();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-med-primary-950 px-4 py-8 sm:p-6">
      <BrandHeader />

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-med-primary-900">
            Portal del Paciente
          </h2>
          <p className="text-xs text-med-text-sub mt-1 leading-relaxed">
            Inicia sesión para reservar y consultar tus turnos médicos
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            id="username"
            label="Correo Electrónico"
            type="email"
            placeholder="paciente@medportal.com"
            icon={Mail}
            error={errors.username?.message}
            {...register('username', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresá un correo electrónico válido',
              },
            })}
          />

          <Input
            id="dni"
            label="DNI"
            type="text"
            inputMode="numeric"
            placeholder="12345678"
            icon={IdCard}
            error={errors.dni?.message}
            {...register('dni', {
              required: 'El DNI es obligatorio',
              pattern: {
                value: /^\d{7,8}$/,
                message: 'El DNI debe tener 7 u 8 dígitos',
              },
            })}
          />

          <Button type="submit" className="w-full mt-1">
            Ingresar Paciente
          </Button>

          <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-lg p-2.5 text-center text-xs text-med-primary-900">
            Ingresá con tu email y tu DNI. Si no tenés cuenta, se crea
            automáticamente.
          </div>

          <ErrorMessage message={errorMessage} />
        </form>
      </div>

      {/* Switch to Admin Portal */}
      <div className="mt-6 text-center">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1 text-xs text-med-primary-200 hover:text-white transition"
        >
          ¿Es personal administrativo o médico? Ingrese aquí
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default PatientLoginPage;

import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';
import ErrorMessage from '../../shared/components/ErrorMessage';
import { usePatientLogin } from '../hooks/usePatientLogin';
import {
  ArrowRight,
  IdCard,
  Mail,
  ShieldCheck
} from 'lucide-react';

function PatientLoginPage() {
  const { register, handleSubmit, errors, onSubmit, errorMessage } =
    usePatientLogin();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-med-primary-950 px-4 py-8 sm:p-6">
      {/* Brand Header idéntico a admin-login */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
          <ShieldCheck size={40}/>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          MedPortal
        </h1>
      </div>

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
          {/* Correo Electrónico */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-med-text-main">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
                <Mail size={16}/>
              </span>
              <input
                type="email"
                placeholder="paciente@medportal.com"
                className={`w-full border rounded-lg pl-10 pr-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
                  errors.username
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-med-border'
                }`}
                {...register('username', {
                  required: 'El correo electrónico es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresá un correo electrónico válido',
                  },
                })}
              />
            </div>
            <ErrorMessage message={errors.username?.message} variant="field" />
          </div>

          {/* DNI */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dni"
              className="text-xs font-semibold text-med-text-main"
            >
              DNI
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
                <IdCard size={16}/>
              </span>
              <input
                id="dni"
                type="text"
                inputMode="numeric"
                placeholder="12345678"
                className={`w-full border rounded-lg pl-10 pr-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
                  errors.dni
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-med-border'
                }`}
                {...register('dni', {
                  required: 'El DNI es obligatorio',
                  pattern: {
                    value: /^\d{7,8}$/,
                    message: 'El DNI debe tener 7 u 8 dígitos',
                  },
                })}
              />
            </div>
            <ErrorMessage message={errors.dni?.message} variant="field" />
          </div>

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

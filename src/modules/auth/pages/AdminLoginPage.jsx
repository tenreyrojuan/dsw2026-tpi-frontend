import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminLogin } from '../hooks/useAdminLogin';
import ErrorMessage from '../../shared/components/ErrorMessage';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, errors, onSubmit, errorMessage } =
    useAdminLogin();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-med-primary-950 px-4 py-8">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
          <ShieldCheck className="w-8 h-8 text-med-primary-900" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          MedPortal
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        <div className="p-8 sm:p-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-med-primary-900">
              Bienvenido de nuevo
            </h2>
            <p className="text-xs text-med-text-sub mt-1 leading-relaxed">
              Por favor, autentíquese para acceder al portal de proveedores.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Correo Electrónico */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-med-text-main">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="admin@medportal.com"
                  className={`w-full border rounded-lg pl-10 pr-3.5 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
                    errors.username
                      ? 'border-red-400 bg-red-50/20'
                      : 'border-med-border'
                  }`}
                  {...register('username', {
                    required: 'El correo electrónico es obligatorio',
                  })}
                />
              </div>
              <ErrorMessage message={errors.username?.message} variant="field" />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-med-text-main">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
                  <LockKeyhole className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg pl-10 pr-10 py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
                    errors.password
                      ? 'border-red-400 bg-red-50/20'
                      : 'border-med-border'
                  }`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                  title={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-med-text-muted hover:text-med-text-main"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <ErrorMessage message={errors.password?.message} variant="field" />
            </div>

            {/* Botón de Submit */}
            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 bg-med-primary-900 hover:bg-med-primary-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-lg p-2.5 text-center text-xs text-med-primary-900">
              <span className="font-semibold">Credenciales de prueba:</span>
              <br />
              Email: <code>admin1@medportal.com</code> | Clave:{' '}
              <code>Admin!123</code>
            </div>

            {/* Error Message */}
            <ErrorMessage message={errorMessage} />
          </form>
        </div>

        {/* Banner Inferior Informativo */}
        <div className="bg-med-primary-50 border-t border-med-primary-100 p-4 sm:p-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-med-primary-600 shrink-0 mt-0.5" />
          <p className="text-xs text-med-text-sub leading-relaxed">
            <strong className="text-med-text-main font-semibold">
              Solo Acceso Seguro:
            </strong>{' '}
            Este sistema es para personal médico autorizado. Los intentos de
            acceso no autorizados son registrados y monitoreados para su
            cumplimiento.
          </p>
        </div>
      </div>

      {/* Switch to Patient Portal */}
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-xs text-med-primary-200 hover:text-white transition"
        >
          <ArrowLeft className="w-3 h-3" />
          Volver al Portal de Pacientes
        </Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;

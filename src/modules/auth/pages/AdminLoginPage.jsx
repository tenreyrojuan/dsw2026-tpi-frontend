import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminLogin } from '../hooks/useAdminLogin';
import ErrorMessage from '../../shared/components/ErrorMessage';
import BrandHeader from '../../shared/components/BrandHeader';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
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
      <BrandHeader />

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
            <Input
              id="admin-email"
              label="Correo Electrónico"
              type="email"
              placeholder="admin@medportal.com"
              icon={Mail}
              error={errors.username?.message}
              {...register('username', {
                required: 'El correo electrónico es obligatorio',
              })}
            />

            <Input
              id="admin-password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={LockKeyhole}
              error={errors.password?.message}
              rightElement={
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
              }
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />

            <Button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 py-2.5"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

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

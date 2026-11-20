export function AddSpecialtyFormHeader({ onNavigateBack }) {
  return (
    <>
      <nav className="text-xs text-med-text-sub flex items-center gap-2">
        <span
          onClick={onNavigateBack}
          className="font-semibold hover:text-med-primary-900 cursor-pointer"
        >
          Especialidades
        </span>
        <span>{'>'}</span>
        <span className="hover:text-med-primary-900 cursor-pointer">
          Agregar Nueva Especialidad
        </span>
      </nav>

      <div>
        <h1 className="text-l sm:text-2l font-bold tracking-tight text-med-primary-900">
          Registrar Nueva Especialidad
        </h1>
        <p className="text-sm text-med-text-sub mt-1">
          Complete la información técnica y administrativa para dar de alta una
          especialidad médica en el sistema hospitalario.
        </p>
      </div>
    </>
  );
}
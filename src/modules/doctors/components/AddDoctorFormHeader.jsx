import { UserPlus, User } from 'lucide-react';


export function AddDoctorFormHeader() {
  return (
    <section className="flex flex-col gap-1 bg-gray-200 p-6 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <UserPlus />
        <h2 className="text-2xl font-semibold">Registrar Nuevo Doctor</h2>
      </div>
      <p className="text-gray-600">
        Complete todos los campos obligatorios para integrar el nuevo
        facultativo al sistema del centro medico
      </p>
    </section>
  );
}

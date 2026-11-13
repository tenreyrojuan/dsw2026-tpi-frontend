import { useState } from 'react';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { ChevronLeft, ChevronRight, Heart, Pen, Plus, Search, Smile, Trash } from 'lucide-react';
import LightBulb from '../../../assets/LightBulb';
import Flask from '../../../assets/Flask';

function SpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const specialtiesList = [
    {
      id: 1,
      name: 'Cardiología',
      description:
        'Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.',
      status: 'Active',
      icon: (
        <Heart size={18}/>
      ),
    },
    {
      id: 2,
      name: 'Neurología',
      description:
        'Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales.',
      status: 'Active',
      icon: (
        <LightBulb />
      ),
    },
    {
      id: 3,
      name: 'Dermatología',
      description:
        'Atención integral de enfermedades de la piel, uñas y cabello.',
      status: 'Inactive',
      icon: (
        <Flask />
      ),
    },
    {
      id: 4,
      name: 'Pediatría',
      description: 'Cuidado médico de lactantes, niños y adolescentes.',
      status: 'Active',
      icon: (
        <Smile size={18}/>
      ),
    },
  ];

  const filteredSpecialties = specialtiesList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Cabecera con Título, Buscador y Botón */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Directorio de Especialidades
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Administre las categorías médicas, servicios y disponibilidad del
            personal especializado.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-med-text-muted">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Buscar especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
          </div>

          {/* Botón Nueva Especialidad */}
          <Button
            onClick={() => alert('Abrir modal para crear nueva especialidad')}
            className="flex items-center gap-1.5 bg-med-primary-900 hover:bg-med-primary-800 text-white font-medium"
          >
            <Plus size={16}/>
            <span>Nueva Especialidad</span>
          </Button>
        </div>
      </div>

      {/* Tabla Principal de Especialidades */}
      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de Especialidades
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
              <tr>
                <th className="px-6 py-3.5">Nombre de la Especialidad</th>
                <th className="px-6 py-3.5">Descripción</th>
                <th className="px-6 py-3.5 text-center">Estado</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-med-border-subtle">
              {filteredSpecialties.map((spec) => (
                <tr
                  key={spec.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Nombre con icono en caja celeste */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-med-primary-100 text-med-primary-700 flex items-center justify-center shrink-0">
                        {spec.icon}
                      </div>
                      <span className="font-semibold text-med-primary-900">
                        {spec.name}
                      </span>
                    </div>
                  </td>

                  {/* Descripción */}
                  <td className="px-6 py-4 text-med-text-sub max-w-md">
                    {spec.description}
                  </td>

                  {/* Estado (Active / Inactive) */}
                  <td className="px-6 py-4 text-center">
                    {spec.status === 'Active' ? (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-med-active-bg text-med-active-text">
                        Active
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Acciones: Editar y Eliminar */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-med-text-muted">
                      <button
                        title="Editar especialidad"
                        className="p-1.5 rounded-lg hover:bg-med-primary-50 text-med-text-muted hover:text-med-primary-900 transition"
                        onClick={() =>
                          alert(`Editar especialidad ${spec.name}`)
                        }
                      >
                        <Pen size={15}/>
                      </button>

                      <button
                        title="Eliminar especialidad"
                        className="p-1.5 rounded-lg hover:bg-red-50 text-med-text-muted hover:text-med-danger-text transition"
                        onClick={() =>
                          alert(`Eliminar especialidad ${spec.name}`)
                        }
                      >
                        <Trash size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador normalizado idéntico a Búsqueda y Filtrado de Citas */}
        <div className="p-4 bg-med-primary-50/50 border-t border-med-border flex items-center justify-between text-xs text-med-text-muted">
          <span>Mostrando 4 de 32 registros</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 border border-med-border rounded bg-white text-med-text-sub hover:bg-gray-50">
              <ChevronLeft size={12}/>
            </button>
            <button className="px-2.5 py-1 border border-med-border rounded bg-white text-med-text-sub hover:bg-gray-50">
              <ChevronRight size={12}/>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SpecialtiesPage;

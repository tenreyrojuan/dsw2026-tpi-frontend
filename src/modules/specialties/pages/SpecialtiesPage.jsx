import { useState } from 'react';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { ChevronLeft, ChevronRight, Heart, Pen, Plus, Search, Smile, Trash } from 'lucide-react';
import LightBulb from '../../../assets/LightBulb';
import Flask from '../../../assets/Flask';
import Table from '../../shared/components/Table';

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
        <Table columns={[
          { key: 'name', label: 'Nombre de la Especialidad' },
          { key: 'description', label: 'Descripción' },
          { key: 'status', label: 'Estado' }
        ]} data={filteredSpecialties} />
      </Card>
    </div>
  );
}

export default SpecialtiesPage;

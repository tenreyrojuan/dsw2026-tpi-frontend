import { Search } from 'lucide-react';
import Actions from './SpecialtyHeaderAction';

export default function SpecialtyHeader({ searchTerm, setSearchTerm }) {
  return (
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

        <Actions />
      </div>
    </div>
  );
}
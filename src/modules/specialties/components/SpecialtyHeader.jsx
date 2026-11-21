import { Header } from '../../shared/components/Header';
import Searchbar from '../../shared/components/Searchbar';
import Actions from './SpecialtyHeaderAction';

export default function SpecialtyHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <Header
        title="Directorio de Especialidades"
        subtitle="Administre las categorías médicas, servicios y disponibilidad del personal especializado."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Searchbar
          placeholder="Buscar especialidad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Actions />
      </div>
    </div>
  );
}
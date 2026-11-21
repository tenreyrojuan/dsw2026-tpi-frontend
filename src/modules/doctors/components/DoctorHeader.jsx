import Actions from "./Actions";
import Searchbar from '../../shared/components/Searchbar';
import { Header } from '../../shared/components/Header';

export default function DoctorHeader({ onSearchTermChange }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      <Header
        title="Directorio de Doctores"
        subtitle="Gestione el personal médico y supervise su disponibilidad actual."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Searchbar
          placeholder="Buscar doctor por nombre..."
          onChange={onSearchTermChange}
        />
        <Actions />
      </div>

    </div>
  )
}
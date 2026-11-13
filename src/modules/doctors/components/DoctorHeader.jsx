import Actions from "./Actions";
import Searchbar from "./Searchbar";

{/* Título y Acciones de Cabecera */}
export default function DoctorHeader({searchTerm, setSearchTerm}) {
return (
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <header>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Directorio de Doctores
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Gestione el personal médico y supervise su disponibilidad actual.
          </p>
        </header>
        
        <div className="flex flex-wrap items-center gap-3">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Actions />
        </div>

      </div>    
)
}
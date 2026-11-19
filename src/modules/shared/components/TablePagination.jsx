import {LeftArrowButton, RightArrowButton} from "../components/ArrowButtons"

function TablePagination({
  from,
  to,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
}) {
  return (
    <div className="p-4 bg-med-primary-50/50 border-t border-med-border flex items-center justify-between text-xs text-med-text-muted">
      <span>
        Mostrando {from} a {to} de {totalItems} registros
      </span>
      <div className="flex items-center gap-1">
        <LeftArrowButton 
        onPageChange = {onPageChange}
        currentPage={currentPage}
        />
        <RightArrowButton 
        onPageChange={onPageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default TablePagination;

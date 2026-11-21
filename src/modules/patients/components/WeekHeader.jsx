import { ChevronLeft, ChevronRight } from 'lucide-react';

const arrowStyle =
  'p-1 rounded-md border border-med-border text-med-text-sub hover:bg-gray-50 transition disabled:opacity-40';

function WeekHeader({ label, canGoPrev, onPrev, onNext }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-med-border-subtle">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={arrowStyle}
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Semana anterior"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="font-bold text-sm sm:text-base text-med-primary-900">
          {label}
        </span>
        <button
          type="button"
          className={arrowStyle}
          onClick={onNext}
          aria-label="Semana siguiente"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs text-med-text-sub">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-med-primary-900" />
          Disponible
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Seleccionado
        </span>
      </div>
    </div>
  );
}

export default WeekHeader;
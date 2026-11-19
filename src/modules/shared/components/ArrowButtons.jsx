import { ChevronLeft, ChevronRight } from 'lucide-react';

export function LeftArrowButton({ onPageChange, currentPage = 1 }) {
  return (
    <button
      type="button"
      onClick={() => onPageChange && onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
      className="px-2.5 py-1 border border-med-border rounded bg-white text-med-text-sub hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      <ChevronLeft size={16} />
    </button>
  );
}

export function RightArrowButton({
  onPageChange,
  totalPages,
  currentPage = 1,
}) {
  return (
    <button
      type="button"
      onClick={() => onPageChange && onPageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
      className="px-2.5 py-1 border border-med-border rounded bg-white text-med-text-sub hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      <ChevronRight size={16} />
    </button>
  );
}

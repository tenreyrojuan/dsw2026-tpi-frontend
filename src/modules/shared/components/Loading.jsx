import { Loader2 } from 'lucide-react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-med-text-muted">
      <Loader2 className="w-8 h-8 animate-spin text-med-primary-600" />
      <span className="mt-2 text-xs">Cargando...</span>
    </div>
  );
}

export default Loading;

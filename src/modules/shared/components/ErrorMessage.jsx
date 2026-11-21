import { CircleAlert } from 'lucide-react';

function ErrorMessage({ message, variant = 'block' }) {
  if (!message) return null;

  if (variant === 'field') {
    return (
      <p
        role="alert"
        className="flex items-center gap-1.5 text-xs font-medium text-red-600"
      >
        <CircleAlert size={14} className="shrink-0" />
        {message}
      </p>
    );
  }

  return (
    <div
      role="alert"
      className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600"
    >
      <CircleAlert size={16} className="shrink-0" />
      {message}
    </div>
  );
}

export default ErrorMessage;

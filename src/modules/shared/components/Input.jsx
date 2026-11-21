import ErrorMessage from './ErrorMessage';

function Input({
  label,
  placeholder = '',
  error = '',
  className = '',
  icon,
  rightElement,
  ...restProps
}) {
  const Icon = icon;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={restProps.id}
          className="text-xs font-semibold text-med-text-main"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-med-text-muted">
            <Icon size={16} />
          </span>
        )}
        <input
          className={`w-full border rounded-lg ${Icon ? 'pl-10' : 'pl-3.5'} ${rightElement ? 'pr-10' : 'pr-3.5'} py-2.5 text-sm bg-white text-med-text-main placeholder-med-text-muted transition focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
            error ? 'border-red-400 bg-red-50/20' : 'border-med-border'
          } ${className}`}
          placeholder={placeholder}
          {...restProps}
        />
        {rightElement}
      </div>
      <ErrorMessage message={error} variant="field" />
    </div>
  );
}

export default Input;

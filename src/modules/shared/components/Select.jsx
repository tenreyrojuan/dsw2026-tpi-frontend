export default function Select({
  label,
  data = [],
  optionName = '',
  placeholder = '',
  error = '',
  children,
  ...restProps
}) {
  return (
    <div className="flex flex-col w-full gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-med-text-main">
          {label}
        </label>
      )}
      <select
        defaultValue=""
        className={`flex flex-col px-3.5 py-2.5 text-sm ${error ? 'border-red-400 bg-red-50/20' : 'border-med-border'}`}
        {...restProps}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children
          ? children
          : data.map((d) => (
              <option key={d.id} value={d.id}>
                {d[optionName]}
              </option>
            ))}
      </select>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

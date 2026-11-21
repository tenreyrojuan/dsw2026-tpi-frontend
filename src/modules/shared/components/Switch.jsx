function Switch({ checked, onChange, label, disabled = false }) {
  return (
    <label className="flex items-center gap-2 text-sm text-med-text-main">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-med-primary-600 disabled:opacity-50 ${
          checked ? 'bg-med-primary-900' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
      </button>
      {label}
    </label>
  );
}

export default Switch;

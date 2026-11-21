function SlotButton({ time, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border transition ${
        isSelected
          ? 'bg-emerald-400 text-white border-emerald-400 shadow-sm'
          : 'bg-white border-med-border text-med-primary-900 hover:border-med-primary-600'
      }`}
    >
      {time}
    </button>
  );
}

export default SlotButton;
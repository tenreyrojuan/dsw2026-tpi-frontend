import { Search } from 'lucide-react';

function Searchbar({
  placeholder,
  className = 'min-w-[240px] flex-1 sm:flex-initial',
  ...inputProps
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-med-text-muted">
        <Search size={16} />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
        {...inputProps}
      />
    </div>
  );
}

export default Searchbar;

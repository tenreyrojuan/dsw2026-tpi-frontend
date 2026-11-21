function CardHeader({ title, children }) {
  return (
    <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-med-border">
      <h2 className="text-base font-bold text-med-primary-900">{title}</h2>
      {children}
    </div>
  );
}

export default CardHeader;

export function Header({ title, subtitle }) {
  return (
    <section>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
        {title}
      </h1>
      <p className="text-sm text-med-text-sub mt-1">{subtitle}</p>
    </section>
  );
}

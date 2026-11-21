import Card from '../../shared/components/Card';

function StatCard({ icon, label, value }) {
  const Icon = icon;

  return (
    <Card className="flex flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
          {label}
        </span>
        <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
          {value}
        </p>
      </div>
    </Card>
  );
}

export default StatCard;

import Card from '../../shared/components/Card';

function DoctorCard({ doctor }) {
  const initials = doctor.name
    .replace(/^(dr|dra)\.?\s+/i, '')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="p-5 sm:p-6 flex items-center gap-4">
      <div className="w-14 h-14 shrink-0 rounded-2xl bg-med-primary-100 border border-med-primary-200 flex items-center justify-center text-lg font-bold text-med-primary-900">
        {initials}
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-bold text-med-primary-900">
          {doctor.name}
        </h2>
        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-med-primary-100 text-med-primary-700">
          {doctor.specialty?.name}
        </span>
        <p className="text-xs text-med-text-muted mt-1">
          Matrícula: {doctor.licenseNumber}
        </p>
      </div>
    </Card>
  );
}

export default DoctorCard;
import { ShieldCheck } from 'lucide-react';

function BrandHeader() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
        <ShieldCheck className="w-8 h-8 text-med-primary-900" />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        MedPortal
      </h1>
    </div>
  );
}

export default BrandHeader;

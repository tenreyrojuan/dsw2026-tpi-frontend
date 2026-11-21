import { useState } from 'react';
import { Info } from 'lucide-react';
import Card from '../../shared/components/Card';
import Select from '../../shared/components/Select';
import ErrorMessage from '../../shared/components/ErrorMessage';
import AvailabilityForm from '../components/AvailabilityForm';
import { useDoctors } from '../hooks/useDoctors';

function DoctorAvailabilitiesPage() {
  const [doctorId, setDoctorId] = useState('');
  const { doctors, error } = useDoctors({ pageSize: 100 });
  const doctor = doctors.find((d) => String(d.id) === doctorId);

  return (
    <div className="flex flex-col gap-6 text-blue-900">
      <h3>
        Doctores {'>'} <strong>Disponibilidad Horaria</strong>
      </h3>
      <section className="flex flex-col gap-3">
        <h2>Gestionar Disponibilidad Horaria</h2>
        <p className="text-sm text-gray-600">
          Define los días y rangos de atención para el profesional seleccionado.
        </p>
      </section>
      <div className="flex w-full gap-4 items-start">
        <div className="flex flex-col flex-1 gap-4">
          <Card>
            {error && (
              <div className="mb-4">
                <ErrorMessage message={error} />
              </div>
            )}
            <Select
              label="Seleccionar Profesional"
              placeholder="Seleccione un profesional"
              data={doctors}
              optionName="name"
              onChange={(e) => setDoctorId(e.target.value)}
            />
            {doctor && (
              <div className="flex flex-col p-5 mt-4 bg-sky-50 rounded-lg">
                <strong>{doctor.name}</strong>
                <span>ID: {doctor.licenseNumber}</span>
                <span>Sede Central</span>
              </div>
            )}
          </Card>
          <Card>
            <div className="flex gap-4">
              <Info className="shrink-0" />
              <p className="text-black">
                Los cambios realizados se aplicarán a partir de la próxima
                semana calendario. Las citas ya programadas no se verán
                afectadas automáticamente
              </p>
            </div>
          </Card>
        </div>
        <div className="flex-2">
          {doctorId && <AvailabilityForm key={doctorId} doctorId={doctorId} />}
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailabilitiesPage;

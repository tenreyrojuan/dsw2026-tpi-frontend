import { Info } from 'lucide-react';
import Card from '../../shared/components/Card';
import Select from '../../shared/components/Select';
import Table from '../../shared/components/Table';
import { useForm } from 'react-hook-form';
import { useDoctors } from '../hooks/useDoctors';
import FormButtons from '../../shared/components/FormButtons';
import { useState } from 'react';
import { addDoctorAvailability } from '../services/addDoctorAvailability';

function DoctorAvailabilitiesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const { doctors } = useDoctors();

  const selectedDoctor = doctors.find(
    (doctor) => String(doctor.id) === selectedDoctorId
  );

  const onSubmit = async (data) => {
    
    //try{
    //  const response = await addDoctorAvailability({doctorId: data.doctorId, day: data.day, startTime })
    //}
  }

  return (
    <div className="flex flex-col gap-6 text-blue-900">
      <div className="flex flex-col gap-6">
        <h3>
          Doctores {'>'} <strong>Disponibilidad Horaria</strong>
        </h3>
        <section className="flex flex-col gap-3">
          <h2>Gestionar Disponibilidad Horaria</h2>
          <p className="text-sm text-gray-600">
            Define los días y rangos de atención para el profesional
            seleccionado.
          </p>
        </section>
        <form className="flex w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col flex-1 gap-4">
            <Card>
              <div className="flex flex-col gap-4">
                <Select
                  label="Seleccionar Profesional"
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  {...register('doctorId', {
                    required: 'Seleccione un medico por favor',
                  })}
                  error={errors.doctorId?.message}
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {`${doctor.name} - ${doctor.specialty.name}`}
                    </option>
                  ))}
                </Select>
                {selectedDoctor ? (
                  <div className="flex flex-col p-5 bg-sky-50 rounded-lg">
                    <strong>{selectedDoctor.name}</strong>
                    <span>ID: {selectedDoctor.licenseNumber}</span>
                    <span>Sede Central</span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </Card>

            <Card>
              <div className="flex flex-1 gap-4">
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
            <Card>
              <section className="flex justify-between">
                <h4>Configuracion de horarios</h4>
                <p className="text-sm text-gray-500">
                  Intervalos automáticos de 30 minutos
                </p>
              </section>

              <div className="border-b border-gray-400 pb-6 text-black">
                <Table
                  columns={[
                    { key: 'day', label: 'dia' },
                    { key: 'state', label: 'estado' },
                    { key: 'from', label: 'entrada' },
                    { key: 'to', label: 'salida' },
                  ]}
                  data={[
                    { day: 'Lunes', state: true, from: '08:00', to: '16:00' },
                    { day: 'Martes', state: true, from: '08:00', to: '16:00' },
                    {
                      day: 'Miércoles',
                      state: true,
                      from: '08:00',
                      to: '12:00',
                    },
                    { day: 'Jueves', state: true, from: '09:00', to: '18:00' },
                    { day: 'Viernes', state: true, from: '08:00', to: '14:00' },
                    { day: 'Sábado', state: false, from: '--', to: '--' },
                  ]}
                />
              </div>
              <FormButtons
                label={'Guardar Disponibilidad'}
                isSubmitting={isSubmitting}
              />
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorAvailabilitiesPage;

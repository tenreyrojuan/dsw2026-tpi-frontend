import { UserPlus, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/Input';
import { useEffect, useState } from 'react';
import { AddDoctor } from '../services/addDoctor';
import { fetchSpecialties } from '../services/fetchSpecialties';
import { useNavigate } from 'react-router-dom';
import Loading from '../../shared/components/Loading';
import Select from '../../shared/components/Select';

export function AddDoctorPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [specialties, setSpecialties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const specialties = await fetchSpecialties();

        if (specialties.data.length === 0)
          setError('No se encontraron especialidades');
        setSpecialties(specialties.data);

        setError(specialties.error);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const onSubmit = async (data) => {
    try {
      const { newDoctor, error } = await AddDoctor({
        name: data.name,
        licenseNumber: data.licenseNumber,
        specialtyId: data.specialtyId,
      });
      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-6 text-blue-900">
      <h2>
        Doctors {'>'} <strong>Agregar Nuevo Doctor</strong>
      </h2>

      <div className="rounded-lg border border-gray-300 overflow-hidden">
        <section className="flex flex-col gap-1 bg-gray-200 p-6 border-b border-gray-300">
          <div className="flex items-center gap-4">
            <UserPlus />
            <h2 className="text-2xl font-semibold">Registrar Nuevo Doctor</h2>
          </div>
          <p className="text-gray-600">
            Complete todos los campos obligatorios para integrar el nuevo
            facultativo al sistema del centro medico
          </p>
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6">
            <fieldset
              disabled={isSubmitting}
              className="flex flex-col gap-4 border-b border-gray-300 pb-6"
            >
              <Input
                label={'Nombre Completo del Doctor'}
                placeholder={'Ej. Dr. Alejandro Dominguez'}
                {...register('name', {
                  required: 'El Nombre es Obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener 3 caracteres o más',
                  },
                  maxLength: {
                    value: 100,
                    message: 'El nombre debe tener hasta 100 caracteres',
                  },
                })}
                error={errors.name?.message}
              />
              <div className="flex flex-1 w-full gap-10 items-center">
                <Select
                  label={'Especialidad'}
                  data={specialties}
                  optionName={'name'}
                  placeholder="Seleccione especialidad"
                  {...register('specialtyId', {
                    required: 'El medico debe llevar una especialidad',
                  })}
                  error={errors.specialtyId?.message}
                />
                <div className="w-full">
                  <Input
                    label={'Número de Licencia Médica'}
                    placeholder={'ID-45920-X'}
                    {...register('licenseNumber', {
                      required: 'La Licencia es Obligatoria',
                    })}
                    error={errors.licenseNumber?.message}
                  />
                </div>
              </div>
            </fieldset>
            <div className="flex w-full justify-end p-4 gap-4">
              <Buttons />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Buttons() {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-end p-4 gap-4">
      <button
        type="button"
        className="px-6 py-2.5 bg-white border rounded-sm"
        onClick={() => navigate(-1)}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 bg-blue-900 text-white border rounded-sm"
      >
        Crear Médico
      </button>
    </div>
  );
}

import { Clock4Icon, Plus} from 'lucide-react';
import Button from '../../shared/components/Button';

export default function Actions(){
  return(
    <div className='flex flex-wrap items-center gap-1'>
      <Button
          onClick={() => alert('Abrir modal de disponibilidad horaria')}
          className="flex items-center gap-2 bg-med-primary-900 hover:bg-med-primary-800 text-white"
          >
          <Clock4Icon size={18} />
          <span>Agregar Disponibilidad Horaria</span>
          </Button>

          <Button
          onClick={() => alert('Abrir modal de nuevo doctor')}
          className="flex items-center gap-1.5 bg-med-primary-700 hover:bg-med-primary-800 text-white"
          >
          <Plus size={18}/>
          <span>Nuevo Doctor</span>
          </Button>
    </div>
  );
}
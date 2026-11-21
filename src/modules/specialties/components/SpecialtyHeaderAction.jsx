import { Plus } from 'lucide-react';
import Button from '../../shared/components/Button';
import { useNavigate } from 'react-router-dom';

export default function Actions() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-1">
      <Button
        onClick={() => navigate('/admin/specialties/add')}
        className="flex items-center gap-1.5 bg-med-primary-700 hover:bg-med-primary-800 text-white"
      >
        <Plus size={18} />
        <span>Nueva Especialidad</span>
      </Button>
    </div>
  );
}
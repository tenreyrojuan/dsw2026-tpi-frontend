import { Eye, Pen, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TableActions({
  doctor,
  removeDoctor,
  isDeleting,
  deleteError,
}) {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-2 w-full text-med-primary-600">
      <ActionButton
        title="Ver detalle"
        onClick={() => alert(`Ver detalle de ${doctor.name}`)}
      >
        <Eye size={16} />
      </ActionButton>

        <ActionButton
          title="Editar profesional"
          onClick={() => navigate('update')}
        >
          <Pen size={15} />
        </ActionButton>

        <ActionButton
          title="Eliminar profesional"
          onClick={() => {
            const confirmed = window.confirm(
              `Estas seguro que deseas eliminar a ${doctor.name}`
            );
            if (confirmed) {
              removeDoctor(doctor.id);
              window.location.reload();
            }
          }}
          color="text-red-600"
          disabled={isDeleting}
        >
          <Trash size={16} />
        </ActionButton>
      </div>
    </td>
  );
}

function ActionButton({
  title,
  onClick,
  children,
  disabled = '',
  color = 'text-med-primary-600',
}) {
  return (
    <button
      title={title}
      className={`p-1.5 rounded-lg hover:bg-med-primary-50 ${color} hover:text-med-primary-900 transition`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

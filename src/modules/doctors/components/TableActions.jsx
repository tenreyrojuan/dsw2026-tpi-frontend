import { Eye, Pen, Trash } from 'lucide-react';

export default function TableActions({ doctor, removeDoctor }) {
  return (
    <td className="px-6 py-4 text-right">
      <div className="flex items-center justify-end gap-2 text-med-primary-600">
        <ActionButton
          title="Ver detalle"
          onClick={() => alert(`Ver detalle de ${doctor.name}`)}
        >
          <Eye size={16} />
        </ActionButton>

        <ActionButton
          title="Editar profesional"
          onClick={() => alert(`Editar profesional ${doctor.name}`)}
        >
          <Pen size={15} />
        </ActionButton>

        <ActionButton
          title="Eliminar profesional"
          onClick={() => {
            removeDoctor(doctor.id);
            //alert(`Eliminar profesional ${doc.name}`)
          }}
          color="text-red-600"
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
  color = 'text-med-primary-600',
}) {
  return (
    <button
      title={title}
      className={`p-1.5 rounded-lg hover:bg-med-primary-50 ${color} hover:text-med-primary-900 transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

import { Eye, Pen, Trash } from 'lucide-react';

export default function TableActions({
  onView,
  onEdit,
  onDelete,
  viewTitle = 'Ver detalle',
  editTitle = 'Editar',
  deleteTitle = 'Eliminar',
}) {
  return (
    <div className="flex items-center justify-end gap-2 text-med-primary-600">
      {onView && (
        <ActionButton title={viewTitle} onClick={onView}>
          <Eye size={16} />
        </ActionButton>
      )}

      {onEdit && (
        <ActionButton title={editTitle} onClick={onEdit}>
          <Pen size={15} />
        </ActionButton>
      )}

      {onDelete && (
        <ActionButton
          title={deleteTitle}
          onClick={onDelete}
          color="text-red-600"
        >
          <Trash size={16} />
        </ActionButton>
      )}
    </div>
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
      type="button"
      title={title}
      className={`p-1.5 rounded-lg hover:bg-med-primary-50 ${color} hover:text-med-primary-900 transition`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
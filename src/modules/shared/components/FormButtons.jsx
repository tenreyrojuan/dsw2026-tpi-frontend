import { useNavigate } from "react-router-dom";

function FormButtons({ label, isSubmitting }) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-end p-4 gap-4">
      <button
        type="button"
        className="px-6 py-2.5 bg-white border rounded-sm"
        disabled={isSubmitting}
        onClick={() => navigate(-1)}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className={
          isSubmitting
            ? 'px-6 py-2.5 bg-white border border-sky-900'
            : 'px-6 py-2.5 bg-sky-900 text-white border rounded-sm'
        }
        disabled={isSubmitting}
      >
        {label}
      </button>
    </div>
  );
}
export default FormButtons;
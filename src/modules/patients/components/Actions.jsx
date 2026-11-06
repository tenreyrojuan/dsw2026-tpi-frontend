
{/* Acciones Derecha Desktop / Mobile Avatar */}
export default function Actions({onClick}){

    const handleLogout = () => {
    singout();
    navigate('/login');
    };

    return(
        <div className="flex items-center gap-2 sm:gap-4">
            {/* Iconos sutiles como en el mock */}


            {/* Avatar Paciente */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-med-border">
            <div className="w-8 h-8 rounded-full bg-med-primary-100 text-med-primary-900 font-bold text-xs flex items-center justify-center border border-med-primary-200">
                JD
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-med-text-main">
                Johnathan Doe
            </span>
            </div>

            <button
            onClick={handleLogout}
            className="hidden sm:inline-flex text-xs font-semibold text-med-text-sub hover:text-red-600 px-2.5 py-1.5 rounded-lg border border-med-border hover:bg-red-50/40 transition"
            >
            Salir
            </button>

            {/* Botón hamburguesa móvil */}
            <button
            type="button"
            onClick={onClick}
            className="md:hidden p-1.5 rounded-lg border border-med-border text-med-text-sub hover:bg-gray-50"
            >
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            </button>
        </div>        
    )
}
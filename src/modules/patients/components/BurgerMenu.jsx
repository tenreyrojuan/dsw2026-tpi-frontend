import { NavLink } from "react-router-dom";

{/* Desplegable móvil */}
export default function BurgerMenu({ handleOnClick, handleLogout }) {
    return(
        <div className="md:hidden border-t border-med-border px-4 py-3 bg-white space-y-2">
            <NavLink
            to="/"
            end
            onClick={handleOnClick}
            className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                    ? 'bg-med-primary-900 text-white'
                    : 'text-med-text-sub hover:bg-med-primary-50'
                }`
            }
            >
                Reservar Turno
            </NavLink>
            <NavLink
            to="/appointments"
            onClick={handleOnClick}
            className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                    ? 'bg-med-primary-900 text-white'
                    : 'text-med-text-sub hover:bg-med-primary-50'
                }`
            }
            >
                Mis Turnos
            </NavLink>
            <div className="pt-2 border-t border-med-border-subtle flex items-center justify-between">
            <span className="text-xs font-medium text-med-text-sub"
            >
                Paciente: Johnathan Doe
            </span>
            <button
            onClick={handleLogout}
            className="text-xs font-bold text-red-600"
            >
                Cerrar sesión
            </button>
            </div>
        </div>
    );
}
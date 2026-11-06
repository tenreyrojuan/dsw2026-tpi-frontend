import { NavLink } from "react-router-dom";


// Enlaces de Navegación Desktop
export default function PatientNav(){
    
    const getNavLinkClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
      isActive
        ? 'bg-med-primary-900 text-white'
        : 'text-med-text-sub hover:bg-med-primary-50 hover:text-med-primary-900'
    }`;

    return(
        <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={getNavLinkClass}>
                Reservar Turno
            </NavLink>
            <NavLink to="/appointments" className={getNavLinkClass}>
                Mis Turnos
            </NavLink>
        </nav>
    );
}
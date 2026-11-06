import { NavLink } from "react-router-dom"
import Portal from '../../../assets/Portal';

// 
export default function PatientMenu(){
    return(
    <NavLink to="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-med-primary-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Portal />
        </div>
        <span className="text-lg font-bold text-med-primary-900 tracking-tight">
            Portal Salud
        </span>
    </NavLink>
    );
}
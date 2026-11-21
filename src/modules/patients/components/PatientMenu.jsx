import { NavLink } from "react-router-dom"
import { BriefcaseMedical } from 'lucide-react';

// 
export default function PatientMenu(){
    return(
    <NavLink to="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-med-primary-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <BriefcaseMedical className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold text-med-primary-900 tracking-tight">
            Portal Salud
        </span>
    </NavLink>
    );
}
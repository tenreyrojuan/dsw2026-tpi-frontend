import PatientMenu from "./PatientMenu";
import PatientNav from "./PatientNav";

// Logo y Enlaces Desktop
export default function PatientLogoLinks(){
    return(
        <div className="flex items-center gap-6 sm:gap-8">
            <PatientMenu />
            <PatientNav />
        </div>
    );
}
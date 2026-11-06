import { useState } from 'react';
import useAuth from '../../auth/hook/useAuth';
import PatientLogoLinks from './PatientLogoLinks';
import Actions from './Actions';
import BurgerMenu from './BurgerMenu';

export default function PatientHeader(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { singout } = useAuth();
    const handleLogout = () => {
    singout();
    navigate('/login');
    };

    const handleOnClick = () => setMobileMenuOpen(!mobileMenuOpen);
    const handleOnClose = () => setMobileMenuOpen(false);

    return(
        <header className="bg-white shadow-xs border-b border-med-border sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <PatientLogoLinks />
                <Actions onClick={handleOnClick}/>
            </div>

            {mobileMenuOpen && (
                <BurgerMenu handleOnClick={handleOnClose} handleLogout={handleLogout}/> 
            )}

        </header>
    );
}
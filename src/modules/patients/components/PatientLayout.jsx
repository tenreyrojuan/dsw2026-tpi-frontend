import { Outlet } from 'react-router-dom';
import PatientHeader from './PatientHeader';

function PatientLayout() {

  return (
    <div className="min-h-screen bg-med-bg flex flex-col">
      {/* Header Responsivo */}
      <PatientHeader />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;

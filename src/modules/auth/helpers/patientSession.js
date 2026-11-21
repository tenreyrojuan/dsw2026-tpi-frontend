const DNI_KEY = 'patientDni';

export const getPatientDni = () => localStorage.getItem(DNI_KEY);
export const savePatientDni = (dni) => localStorage.setItem(DNI_KEY, String(dni));
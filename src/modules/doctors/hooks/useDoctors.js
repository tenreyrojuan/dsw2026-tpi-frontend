import { useState } from 'react';

export function useDoctors() {
const [searchTerm, setSearchTerm] = useState('');

  const doctorsList = [
    {
      id: 'MED-4920',
      name: 'Dr. Alejandro Rivera',
      specialty: 'Cardiología Clínica',
      status: 'Active',
      statusType: 'active',
      avatar: '👨‍⚕️',
    },
    {
      id: 'MED-2104',
      name: 'Dra. Elena Martínez',
      specialty: 'Pediatría Avanzada',
      status: 'On Leave',
      statusType: 'danger',
      avatar: '👩‍⚕️',
    },
    {
      id: 'MED-8831',
      name: 'Dr. Marcos Torres',
      specialty: 'Neurocirugía',
      status: 'Active',
      statusType: 'active',
      avatar: '👨‍⚕️',
    },
    {
      id: 'MED-1192',
      name: 'Dra. Lucía Soria',
      specialty: 'Ginecología',
      status: 'Active',
      statusType: 'active',
      avatar: '👩‍⚕️',
    },
  ];

  const filteredDoctors = doctorsList.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { filteredDoctors, searchTerm, setSearchTerm };
}
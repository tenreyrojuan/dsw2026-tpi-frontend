

export function DoctorFilter({doctors,searchTerm}){
  if (doctors.length === 0){
    return [];
  } 

  const docs = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return docs;
}
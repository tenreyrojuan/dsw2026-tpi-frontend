import Loading from '../../shared/components/Loading';
import { useDelete } from '../hooks/useDelete';
import TableActions from './TableActions';

{/* Tabla Principal */}
export default function DoctorsTable({filteredDoctors, isLoading, error}){

  const {removeDoctor, isDeleting, deleteError} = useDelete();

  return(
        isLoading
        ? 
        <Loading />
        :
        <div className="overflow-x-auto">


           <table className="w-full text-left text-sm">
            <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
              <tr>
                <th className="px-6 py-3.5">Nombre del Doctor</th>
                <th className="px-6 py-3.5">Especialidad</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-med-border-subtle">
              {
              error ? 
              <tr>
                <td className='text-red-400'>
                  {error}
                </td>
              
              </tr> 

              : filteredDoctors.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Doctor Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-med-primary-100 flex items-center justify-center text-xl">
                          {doc.avatar}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            doc.statusType === 'active'
                              ? 'bg-emerald-500'
                              : 'bg-rose-500'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-med-primary-900 leading-tight">
                          {doc.name}
                        </p>
                        <p className="text-xs text-med-text-muted mt-0.5">
                          ID: {doc.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Especialidad Badge en Píldora */}
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-med-primary-100 text-med-primary-700">
                      {doc.specialty.name}
                    </span>
                  </td>

                  {/* Botones de Acciones (Ojo, Lápiz, Basurero) */}
                  <TableActions doctor={doc} removeDoctor={removeDoctor}/>
                </tr>
              ))}
                  
            </tbody>
          </table>
              
        </div>
  );
}
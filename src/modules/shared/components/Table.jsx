import TablePagination from './TablePagination';
import ErrorMessage from './ErrorMessage';

export default function Table({
  columns,
  data = [],
  error = '',
  pagination,
  totalItems,
}) {
  return (
    <div className='w-full overflow-x-auto'>
      <table className="w-full table-fixed text-left text-sm">
        <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3.5 ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border-subtle">
          {error ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4">
                <ErrorMessage message={error} />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-6 text-center text-med-text-muted"
              >
                No hay registros para mostrar
              </td>
            </tr>
          ) : (
            data.map((d, index) => (
              <tr
                key={d.id ?? index}
                className="hover:bg-gray-50/70 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {column.render ? column.render(d) : d[column.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {pagination && <TablePagination {...pagination} totalItems={totalItems} />}
    </div >
  );
}
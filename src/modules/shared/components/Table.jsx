import { useState, useEffect } from 'react';
import TablePagination from './TablePagination';

export default function Table({
  columns,
  data = [],
  pageSize = 10,
  error = '',
}) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const from = totalItems > 0 ? startIndex + 1 : 0;
  const to = Math.min(startIndex + pageSize, totalItems);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3.5">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border-subtle">
          {error ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-red-400">
                {error}
              </td>
            </tr>
          ) : paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-6 text-center text-med-text-muted"
              >
                No hay registros para mostrar
              </td>
            </tr>
          ) : (
            paginatedData.map((d, index) => (
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

      <TablePagination
        from={from}
        to={to}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
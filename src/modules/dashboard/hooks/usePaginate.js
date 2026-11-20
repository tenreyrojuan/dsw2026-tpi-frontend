import { useState } from 'react';

export function usePaginate({ pageSize, pageIndex, totalItems }) {
  const [currentPage, setCurrentPage] = useState(pageIndex);

  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    from,
    to,
    totalPages,
    onPageChange,
  };
}

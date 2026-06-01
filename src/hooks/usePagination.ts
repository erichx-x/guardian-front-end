import { useMemo, useState } from 'react';

export function usePagination(total = 0, initialPage = 1, pageSize = 12) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  return {
    page,
    pageSize,
    totalPages,
    goToPage,
    setPage,
  };
}

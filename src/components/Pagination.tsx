'use client';

import { Pagination as BsPagination } from 'react-bootstrap';

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let page = start; page <= end; page += 1) {
    items.push(
      <BsPagination.Item key={page} active={page === currentPage} onClick={() => onChange(page)}>
        {page}
      </BsPagination.Item>
    );
  }

  return (
    <BsPagination className="justify-content-center mt-4">
      <BsPagination.First onClick={() => onChange(1)} disabled={currentPage === 1} />
      <BsPagination.Prev onClick={() => onChange(currentPage - 1)} disabled={currentPage === 1} />
      {start > 1 && <BsPagination.Ellipsis disabled />}
      {items}
      {end < totalPages && <BsPagination.Ellipsis disabled />}
      <BsPagination.Next onClick={() => onChange(currentPage + 1)} disabled={currentPage === totalPages} />
      <BsPagination.Last onClick={() => onChange(totalPages)} disabled={currentPage === totalPages} />
    </BsPagination>
  );
}

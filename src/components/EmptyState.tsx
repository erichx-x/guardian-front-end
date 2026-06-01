'use client';

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-4 p-5 text-center bg-white shadow-sm">
      <h3 className="mb-3">{title}</h3>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
}

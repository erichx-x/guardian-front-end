'use client';

import { Badge } from 'react-bootstrap';

export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="d-flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} bg="light" text="dark" className="border">
          #{tag}
        </Badge>
      ))}
    </div>
  );
}

import { Technique } from '@/types';

export function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function scoreTechnique(item: Technique, query: string) {
  const normalizedQuery = normalize(query);
  const fields = [item.technique, item.category, item.description, ...(item.tags ?? [])];
  return fields.reduce((score, field) => (normalize(field).includes(normalizedQuery) ? score + 1 : score), 0);
}

export function highlightText(text: string, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return text;

  const regex = new RegExp(`(${normalizedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

import { useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';
import { SearchParams } from '@/types';

export function useSearchResults(query: string, params: Partial<SearchParams> = {}) {
  const debouncedQuery = useDebounce(query, 300);
  const { loading, error, results, total, search } = useSearch();

  useEffect(() => {
    search({ ...params, q: debouncedQuery });
  }, [debouncedQuery, params.category, params.page, params.limit, search]);

  return {
    loading,
    error,
    results,
    total,
  };
}

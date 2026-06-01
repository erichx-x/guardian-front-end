import { useState, useCallback } from 'react';
import { Technique, SearchParams } from '@/types';
import { getTechniques } from '@/services/techniqueService';

export function useSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Technique[]>([]);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTechniques(params);
      setResults(response.data);
      setTotal(response.total ?? response.data.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar técnicas');
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    total,
    search,
  };
}

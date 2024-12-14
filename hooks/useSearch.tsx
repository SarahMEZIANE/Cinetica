import { useState, useEffect, useCallback } from 'react';
import { fetchSearchResults } from '@/app/repository/searchRepo';
import { search } from '@/app/entites/search';
import { useSearchParams } from 'next/navigation'


export function useSearch() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [result, setResult] = useState<search[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResult = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const searchResults = await fetchSearchResults(query);
      setResult(searchResults);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('An error occurred while fetching the search results');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResult();
  }, [fetchSearchResult]);

  return { loading, error, result };
}

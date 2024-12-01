import { useState, useCallback } from "react";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
}

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log('query in useSearch', query);
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Error fetching search results");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchResults, loading, error, search };
};
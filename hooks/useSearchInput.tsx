import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSearchInput() {
   const [query, setQuery] = useState('');
   const router = useRouter();

   const handleSearch = (q: string) => {
       setQuery(q);
       if (q.trim()) {
           router.push(`/dashboard/search?query=${encodeURIComponent(q)}`);
       }
   };

   return { query, handleSearch };
}

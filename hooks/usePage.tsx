import { useState , useEffect} from "react";


export function usePage(fetchShows: (page?: number) => Promise<void>) {
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      fetchShows(currentPage);
    }, [currentPage]);
  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
    };


  return { currentPage, handlePageChange }
}
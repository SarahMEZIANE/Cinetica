import { useEffect } from "react"


export function useDiscover(fetchNowPlayingMovies:(page?: number) => Promise<void>,fetchPopularShow:(page?: number) => Promise<void>,fetchTopRatedMovies:(page?: number) => Promise<void>,fetchTopRatedShow:(page?: number) => Promise<void>, fetchOnTheAirShow:(page?: number) => Promise<void>, fetchPopularMovies:(page?: number) => Promise<void>) {
    useEffect(() => {
        fetchPopularMovies(1);
        fetchTopRatedMovies(1);
        fetchNowPlayingMovies(1);
        fetchOnTheAirShow(1);
        fetchTopRatedShow(1);
        fetchPopularShow(1);
      }, []);
}

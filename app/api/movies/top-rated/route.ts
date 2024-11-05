import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;
  const tmdbUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;
  try {
    const response = await fetch(tmdbUrl);
    
    if (!response.ok) {
      return NextResponse.json('Failed to fetch data from TMDb', { status: 500 });
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json('An error occurred while fetching movie data', { status: 500 });
  }
}

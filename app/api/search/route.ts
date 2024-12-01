import { getServerSession } from "next-auth";
import { authOptions } from "@/app/login/auth";
import { NextResponse } from "next/server";
import { Movie } from "@/app/entites/Movie";
import { TVShow } from "@/app/entites/TVShow";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  console.log("query", query);
  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [movieRes, tvRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${session.user.apiKey}&query=${query}`),
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${session.user.apiKey}&query=${query}`),
    ]);

    if (!movieRes.ok || !tvRes.ok) {
      return NextResponse.json({ error: "Error fetching data from TMDB" }, { status: 500 });
    }

    const movies = await movieRes.json();
    const tvShows = await tvRes.json();

    const results = [
      ...(movies.results || []).map((item: Movie) => ({ ...item, media_type: "movie" })),
      ...(tvShows.results || []).map((item: TVShow) => ({ ...item, media_type: "tv" })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
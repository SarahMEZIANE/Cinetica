import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';
import Movie from "@/app/entites/Movie";
import Person from "@/app/entites/Person";


export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        // Étape 1 : Obtenir la liste des films actuellement en salle
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${mysession.user.apiKey}&language=en-US&page=${page}`
        );

        if (!response.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: response.status });
        }

        const data = await response.json();

        const moviesWithCredits = await Promise.all(
            data.results.map(async (movie: Movie) => {
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${mysession.user.apiKey}&language=en-US`
                );

                if (!creditsResponse.ok) {
                    return { ...movie, creditsError: true };
                }

                const creditsData = await creditsResponse.json();

                return {
                    ...movie,
                    cast: creditsData.cast.slice(0, 10000),
                    director: creditsData.crew.find((crew: Person) => crew.job === "Director"),
                };
            })
        );

        return NextResponse.json({ results: moviesWithCredits });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

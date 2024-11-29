import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';
import { TVShow } from "@/app/entites/TVShow";
import Person from "@/app/entites/Person";


export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${mysession.user.apiKey}&language=en-US&page=${page}`
        );

        if (!response.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: response.status });
        }

        const data = await response.json();

        const showsWithCredits = await Promise.all(
            data.results.map(async (show: TVShow) => {
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=${mysession.user.apiKey}&language=en-US`
                );

                if (!creditsResponse.ok) {
                    return { ...show, creditsError: true };
                }

                const creditsData = await creditsResponse.json();

                return {
                    ...show,
                    cast: creditsData.cast.slice(0, 10000),
                    director: creditsData.crew.find((crew: Person) => crew.job === "Director"),
                };
            })
        );

        return NextResponse.json({ results: showsWithCredits });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

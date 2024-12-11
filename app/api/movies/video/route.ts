import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
    const url = new URL(req.url);
    const movieID = url.searchParams.get("movieID") || "1";

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        // Étape 1 : Obtenir la liste des films actuellement en salle
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${mysession.user.apiKey}&include_video_language=en`
        );

        if (!response.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: response.status });
        }

        const data = await response.json();

        return NextResponse.json({ results: data.results });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

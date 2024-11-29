import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const query = url.searchParams.get("query") || ""; // Nouvelle capture de la recherche

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    if (!query) {
        return NextResponse.json({ error: 'Paramètre "query" manquant' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?include_adult=false&api_key=${mysession.user.apiKey}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

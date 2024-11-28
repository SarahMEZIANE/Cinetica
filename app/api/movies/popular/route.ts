import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${mysession.user.apiKey}&language=en-US&page=${page}`
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

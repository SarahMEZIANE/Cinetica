import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${mysession.user.apiKey}&language=en-US&page=1`
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

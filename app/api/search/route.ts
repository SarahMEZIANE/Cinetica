import { getServerSession } from "next-auth";
import { authOptions } from '@/app/login/auth';
import { NextResponse } from 'next/server';
import {search} from "@/app/entites/search";
import Person from "@/app/entites/Person";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || "1";
    const query = url.searchParams.get("query") || "";

    const mysession = await getServerSession(authOptions);

    if (!mysession?.user?.apiKey) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    if (!query) {
        return NextResponse.json({ error: 'Paramètre "query" manquant' }, { status: 400 });
    }

    try {
        // Initial search request
        const searchResponse = await fetch(
            `https://api.themoviedb.org/3/search/multi?include_adult=false&api_key=${mysession.user.apiKey}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`
        );

        if (!searchResponse.ok) {
            return NextResponse.json({ error: 'Erreur TMDB' }, { status: searchResponse.status });
        }

        const searchData = await searchResponse.json();

        // Enhance results with additional details
        const enhancedResults = await Promise.all(
            searchData.results.map(async (item: search) => {
                // Skip additional fetches for person results
                if (item.media_type === 'person') {
                    return item;
                }

                const mediaType = item.media_type; // 'movie' or 'tv'
                const id = item.id;

                // Fetch credits
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${mysession.user.apiKey}&language=en-US`
                );

                // Fetch videos (for trailers)
                const videosResponse = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${mysession.user.apiKey}&language=en-US`
                );

                let credits = {};
                let videos = {};

                if (creditsResponse.ok) {
                    const creditsData = await creditsResponse.json();
                    credits = {
                        cast: creditsData.cast.slice(0, 10000),
                        director: mediaType === 'movie' 
                            ? creditsData.crew.find((crew: Person) => crew.job === "Director")
                            : creditsData.crew.find((crew: Person) => crew.job === "Series Director")
                    };
                }

                if (videosResponse.ok) {
                    const videosData = await videosResponse.json();
                    videos = {
                        videos: videosData.results
                    };
                }

                return {
                    ...item,
                    ...credits,
                    ...videos
                };
            })
        );

        return NextResponse.json({
            ...searchData,
            results: enhancedResults
        });
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
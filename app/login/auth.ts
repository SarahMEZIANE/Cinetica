// /lib/auth.ts
import { DefaultSession, AuthOptions, Account } from 'next-auth';
import { credentialsProvider } from './providers'; 
import { sessionCallback } from './auth-callbacks';  
import { JWT } from 'next-auth/jwt';

declare module "next-auth" {
    interface User {
        username: string;
        apiKey: string;
    }
    interface Session extends DefaultSession {
        user: {
            username: string;
            apiKey: string;
        } & DefaultSession["user"];
    }
}

interface CustomToken extends JWT {
    username?: string;
    apiKey?: string;
}

interface CustomUser {
    username: string;
    apiKey: string;
}

export const authOptions: AuthOptions = {
    providers: credentialsProvider,
    jwt: {
        maxAge: 1800,
    },
    session: {
        strategy: 'jwt',
        maxAge: 1800,
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    },
    callbacks: {
        jwt: async ({
            token,
            user,
            account,
        }: {
            token: JWT; // Utilisez le type JWT attendu par NextAuth
            user?: CustomUser;
            account: Account | null;
        }) => {
            // Ajout des champs personnalisés
            const customToken = token as CustomToken;

            if (user) {
                customToken.username = (user as CustomUser).username;
                customToken.apiKey = (user as CustomUser).apiKey;
            }
            if (account?.provider === 'google') {
                customToken.apiKey = process.env.TMDB_API_KEY;
                customToken.username = customToken.email?.split('@')[0];
            }
            return customToken;
        },
        session: sessionCallback 
    },
    secret: process.env.NEXTAUTH_SECRET
};


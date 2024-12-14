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
            token: CustomToken;
            user?: CustomUser;
            account?:Account;
        }) => {
            if (user) {
                token.username = user.username;
                token.apiKey = user.apiKey;
            }
            if (account?.provider === 'google') {
                token.apiKey = process.env.TMDB_API_KEY;
                token.username = token.email?.split('@')[0];
            }
            return token;
        },
        session: sessionCallback 
    },
    secret: process.env.NEXTAUTH_SECRET
};

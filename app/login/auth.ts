// /lib/auth.ts
import { DefaultSession, AuthOptions } from 'next-auth';
import { credentialsProvider } from './providers'; 
import { jwtCallback, sessionCallback } from './auth-callbacks';  

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

export const authOptions: AuthOptions = {
    providers: [credentialsProvider],
    jwt: {
        maxAge: 60,
    },
    session: {
        strategy: 'jwt',
        maxAge: 60,
    },
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    },
    callbacks: {
        jwt: jwtCallback,
        session: sessionCallback 
    },
    secret: process.env.NEXTAUTH_SECRET
};

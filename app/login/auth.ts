// /lib/auth.ts
import { DefaultSession, AuthOptions } from 'next-auth';
import { credentialsProvider } from './providers';  // Import du provider
import { jwtCallback, sessionCallback } from './auth-callbacks';  // Import des callbacks

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
    providers: [credentialsProvider],  // Utilisation du provider importé
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    },
    callbacks: {
        jwt: jwtCallback,  // Utilisation du callback JWT
        session: sessionCallback  // Utilisation du callback session
    },
    secret: process.env.NEXTAUTH_SECRET
};

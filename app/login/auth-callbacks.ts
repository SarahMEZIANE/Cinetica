import { JWT } from 'next-auth/jwt';
import { Session, Account } from 'next-auth';

interface CustomToken extends JWT {
    username?: string;
    apiKey?: string;
}

interface CustomUser {
    username: string;
    apiKey: string;
}

export const jwtCallback = async ({
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
};

export const sessionCallback = async ({
    session,
    token,
}: {
    session: Session;
    token: CustomToken;
}) => {
    if (session.user) {
        session.user.username = token.username as string;
        session.user.apiKey = token.apiKey as string;
    }
    return session;
};

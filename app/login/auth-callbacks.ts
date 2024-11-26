import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

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
}: {
    token: CustomToken;
    user?: CustomUser;
}) => {
    if (user) {
        token.username = user.username;
        token.apiKey = user.apiKey;
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

import CredentialsProvider from 'next-auth/providers/credentials';

export const credentialsProvider = CredentialsProvider({
    name: 'Credentials',
    credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
            const response = await fetch(`https://cinetica-one.vercel.app/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (data.isAuthenticated) {
                return {
                    id: '1',
                    username: credentials.username,
                    apiKey: process.env.TMDB_API_KEY || ''
                };
            }
            return null;
        } catch (error) {
            console.error('Authentication failed:', error);
            return null;
        }
    }
});

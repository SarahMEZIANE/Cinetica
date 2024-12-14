import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Credentials {
    username: string;
    password: string;
}

export function useLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            const credentials: Credentials = {
                username: username,
                password: password
            };
            const result = await signIn('credentials', {
                ...credentials,
                callbackUrl: '/dashboard',
                redirect: false,
            });

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                setError('Incorrect credentials');
            }
        } catch (e) {
            console.error("Login error:", e);
            setError('Connection error');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (e) {
            console.error("Google login error:", e);
            setError('Google login failed');
        }
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/login' });
    };
    
    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit,
        handleGoogleSignIn,
        handleSignOut
    };
}
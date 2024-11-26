import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Credentials from 'next-auth/providers/credentials';

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

            console.log("SignIn result:", result);

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                setError('Identifiants incorrects');
            }
        } catch (e) {
            console.error("Login error:", e);
            setError('Erreur de connexion');
        }
    };

    return {
      username,
      setUsername,
      password,
      setPassword,
      error,
      handleSubmit
    };
}

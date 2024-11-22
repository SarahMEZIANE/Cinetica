import { useState } from "react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("./api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Connexion réussie :", data);
        setIsLogged(true);
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Impossible de se connecter au serveur.");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
    isLogged,
  };
};

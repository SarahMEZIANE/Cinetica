// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const router=useRouter();

  useEffect(() => {
    const updateTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDarkMode);
      if (prefersDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  const handleClick = async (event: React.FormEvent) => {
    setError("");
    event.preventDefault()
    try {
      const response = await fetch("./api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status==200) {
        const data = await response.json();
        console.log("Connexion réussie :", data);
        setIsLogged(true);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur de connexion"); 
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className={`p-6 flex bg-[#fec04b] bg-cover bg-center items-center justify-center min-h-screen sm:dark:bg-[url('./img/bg-bw.jpg')] sm:bg-[url('./img/bg.jpg')]`}>
      <div className='flex-[2]'></div>
      <div className="p-6 m-10 flex-1 rounded-lg shadow-lg bg-white dark:bg-black w-80">
        <div id="logo" className="flex justify-center mb-4">
          <div className="bg-[url('./img/logo.png')] bg-cover h-24 w-24 bg-center bg-transparent  p-3">
          </div>
        </div>
        <div id="form">
        <form className="space-y-4" >
          <div>
            <label className="block text-gray-700 dark:text-white">Username</label>
            <Input type="text" placeholder="Enter Username"  name="user" className='dark:bg-white dark:text-black' onChange={(e)=>setUsername(e.target.value)} required/>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white">Password</label>
            <Input type="password" placeholder="Enter Password" name='pass' className='dark:bg-white dark:text-black' onChange={(e)=>setPassword(e.target.value)} required/>
          </div>
          {error && (
            <label className="text-red-500 m-4">Password  or username incorrect</label>
          )
          }
          <Button type="submit" onClick={handleClick}  className="w-full bg-[#fec04b] hover:bg-yellow-600 dark:bg-[#fec04b] dark:hover:bg-yellow-700 text-white font-bold">
            Login
          </Button>
        </form>
        </div>
      </div>
    </div>
  );
}

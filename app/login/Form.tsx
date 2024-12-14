"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  handleSubmit,
}: {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}) => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <form className="space-y-4">
      <div id="logo" className="flex justify-center mb-4">
        <Logo />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-white">Username</label>
        <Input
          type="text"
          placeholder="Enter Username"
          className="dark:bg-white dark:text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-white">Password</label>
        <Input
          type="password"
          placeholder="Enter Password"
          className="dark:bg-white dark:text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 m-4">{error}</p>}
      <Button
        onClick={handleSubmit}
        className="w-full bg-[#fec04b] hover:bg-yellow-600 dark:bg-[#fec04b] dark:hover:bg-yellow-700 text-white font-bold"
      >
        Login
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-black px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full dark:text-black"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    </form>
  );
};

export default Form;
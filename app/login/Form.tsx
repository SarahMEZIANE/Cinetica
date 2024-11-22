"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

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
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        type="submit"
        className="w-full bg-[#fec04b] hover:bg-yellow-600 dark:bg-[#fec04b] dark:hover:bg-yellow-700 text-white font-bold"
      >
        Login
      </Button>
    </form>
  );
};

export default Form;

"use client";

import Form from "@/app/login/Form";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { username, setUsername, password, setPassword, error, handleSubmit } =
    useLogin();

  return (
    <div
      className={`p-6 flex bg-[#fec04b] dark:bg-[#907239] bg-cover bg-center items-center justify-center min-h-screen sm:dark:bg-[url('./img/bg-bw.jpg')] sm:bg-[url('./img/bg.jpg')]`}
    >
      <div className="sm:flex-[2]"></div>
      <div className="p-6 m-10 flex-1 rounded-lg shadow-lg bg-white dark:bg-black w-80">
        <Form
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
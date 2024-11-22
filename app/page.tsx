// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-6">
      <h1 className="text-4xl font-bold">Redirecting to Login...</h1>
    </div>
  );
}

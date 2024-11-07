// app/dashboard.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Home, Star, Tv, Film, TrendingUp, Eye, LogOut } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [active, setActive] = useState("main-Discover");

  const navItems = [
    { name: "Discover", icon: <Home className="w-5 h-5" />, section: "main" },
    { name: "Now playing", icon: <Film className="w-5 h-5" />, section: "movies" },
    { name: "Popular", icon: <TrendingUp className="w-5 h-5" />, section: "movies" },
    { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "movies" },
    { name: "On the air", icon: <Tv className="w-5 h-5" />, section: "tv" },
    { name: "Popular", icon: <Eye className="w-5 h-5" />, section: "tv" },
    { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "tv" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">

      <aside className="w-64 bg-black text-gray-200 flex flex-col p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[#fec04b] mb-6">Cinetica</h2>
        
        <nav className="flex flex-col space-y-2 mb-4">
          {navItems
            .filter(item => item.section === "main")
            .map(item => (
              <Button
                key={`${item.section}-${item.name}`}
                onClick={() => setActive(`${item.section}-${item.name}`)}
                className={`justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg  ${
                  active === `${item.section}-${item.name}`
                    ? "bg-[#fec04b] text-gray-900"
                    : "hover:bg-[#fec04b] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            ))}
        </nav>

        <h3 className="text-lg font-semibold text-gray-400 px-4 mt-4">Movies</h3>
        <nav className="flex flex-col space-y-2 mb-4">
          {navItems
            .filter(item => item.section === "movies")
            .map(item => (
              <Button
                key={`${item.section}-${item.name}`}
                onClick={() => setActive(`${item.section}-${item.name}`)}
                className={`justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  active === `${item.section}-${item.name}`
                    ? "bg-[#fec04b] text-gray-900"
                    : "hover:bg-[#fec04b] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            ))}
        </nav>

        {/* TV Shows Section */}
        <h3 className="text-lg font-semibold text-gray-400 px-4 mt-4">TV Shows</h3>
        <nav className="flex flex-col space-y-2">
          {navItems
            .filter(item => item.section === "tv")
            .map(item => (
              <Button
                key={`${item.section}-${item.name}`}
                onClick={() => setActive(`${item.section}-${item.name}`)}
                className={`justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  active === `${item.section}-${item.name}`
                    ? "bg-[#fec04b] text-gray-900"
                    : "hover:bg-[#fec04b] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto">
          <Button
            variant="ghost"
            onClick={() => setActive("logout")}
            className="justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">En cours de developpement ...</h1>
        </header>
      </main>
    </div>
  );
}

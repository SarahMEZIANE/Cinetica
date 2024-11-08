"use client";

import { Button } from "@/components/ui/button";
import { Home, Star, Tv, Film, TrendingUp, Eye, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [active, setActive] = useState("main-Discover");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Discover", icon: <Home className="w-5 h-5" />, section: "main" },
    { name: "Now playing", icon: <Film className="w-5 h-5" />, section: "movies" },
    { name: "Popular", icon: <TrendingUp className="w-5 h-5" />, section: "movies" },
    { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "movies" },
    { name: "On the air", icon: <Tv className="w-5 h-5" />, section: "tv" },
    { name: "Popular", icon: <Eye className="w-5 h-5" />, section: "tv" },
    { name: "Top rated", icon: <Star className="w-5 h-5" />, section: "tv" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#494949]">

      <header className="flex items-center justify-between px-6 py-2 bg-black text-gray-200 shadow-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-[#fec04b]">Cinetica</h2>
          <Button onClick={toggleSidebar} className="text-[#fec04b] lg:hidden">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-60 sm:w-full p-2 max-w-xs bg-white rounded-lg focus:outline-none text-black"
        />
      </header>

      <div className="flex flex-1">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-black text-gray-200 p-6 shadow-lg transform transition-transform lg:translate-x-0 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:flex lg:flex-col`}
        >
          <div className="flex items-center justify-between mb-4">
            <Button onClick={toggleSidebar} className="text-[#fec04b] lg:hidden">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-2 mb-4">
            {navItems
              .filter(item => item.section === "main")
              .map(item => (
                <Button
                  key={`${item.section}-${item.name}`}
                  onClick={() => setActive(`${item.section}-${item.name}`)}
                  className={`hover:bg-[#fec04b] hover:text-white justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
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
                  className={`hover:bg-[#fec04b] hover:text-white justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
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

          <h3 className="text-lg font-semibold text-gray-400 px-4 mt-4">TV Shows</h3>
          <nav className="flex flex-col space-y-2 flex-grow">
            {navItems
              .filter(item => item.section === "tv")
              .map(item => (
                <Button
                  key={`${item.section}-${item.name}`}
                  onClick={() => setActive(`${item.section}-${item.name}`)}
                  className={`hover:bg-[#fec04b] hover:text-white justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
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

          <div className="mt-auto">
            <Button
              onClick={() => setActive("logout")}
              className="hover:bg-[#fec04b] hover:text-white justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10 lg:ml-64">
          <h1 className="text-3xl font-semibold text-gray-700 dark:text-white">En cours de développement ...</h1>
        </main>
      </div>
    </div>
  );
}

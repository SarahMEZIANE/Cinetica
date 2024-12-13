import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { useSearchInput } from '@/hooks/useSearchInput';

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  const { query, handleSearch } = useSearchInput();

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-200 shadow-lg">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-[#fec04b] dark:text-[#fec04b]">Cinetica</h2>
        <Button onClick={toggleSidebar} className="bg-transparent text-[#fec04b] dark:text-[#fec04b] lg:hidden">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      <div className="relative w-44 sm:w-full max-w-xs">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search movies & shows..."
          className="w-full p-2 pl-10 bg-white dark:bg-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fec04b] text-black dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </header>
  );
};

export default Header;
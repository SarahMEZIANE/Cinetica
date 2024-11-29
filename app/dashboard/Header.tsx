import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = ({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-200 shadow-lg">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-[#fec04b] dark:text-[#fec04b]">Cinetica</h2>
        <Button onClick={toggleSidebar} className="bg-transparent text-[#fec04b] dark:text-[#fec04b] lg:hidden">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="w-44 sm:w-full p-2 max-w-xs bg-white dark:bg-[#444444] rounded-lg focus:outline-none text-black dark:text-white"
      />
    </header>
  );
};

export default Header;

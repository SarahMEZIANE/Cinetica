import { Button } from "@/components/ui/button";
import { navItems } from "@/app/dashboard/navItems";
import { X, LogOut } from "lucide-react";

export const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  active,
  setActive,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  active: string;
  setActive: (value: string) => void;
}) => {
  return (
    <div className="flex flex-1">
        <aside
          className={`overflow-y-scroll sm:overflow-auto fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#333333] text-gray-800 dark:text-gray-200 p-6 shadow-lg transform transition-transform lg:translate-x-0 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:flex lg:flex-col`}
        >
          <div className="flex items-center justify-between mb-4">
            <Button onClick={toggleSidebar} className="text-[#fec04b] dark:text-[#fec04b] lg:hidden">
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
                  className={`hover:bg-[#fec04b] hover:text-white bg-white text-black dark:text-white dark:bg-[#494949] justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    active === `${item.section}-${item.name}`
                      ? "bg-[#fec04b] text-gray-900 dark:bg-[#fec04b] dark:text-gray-900"
                      : "hover:bg-[#fec04b] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
          </nav>

          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 px-4 mt-4">Movies</h3>
          <nav className="flex flex-col space-y-2 mb-4">
            {navItems
              .filter(item => item.section === "movies")
              .map(item => (
                <Button
                  key={`${item.section}-${item.name}`}
                  onClick={() => setActive(`${item.section}-${item.name}`)}
                  className={`hover:bg-[#fec04b] hover:text-white bg-white text-black dark:text-white dark:bg-[#494949] justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    active === `${item.section}-${item.name}`
                      ? "bg-[#fec04b] text-gray-900 dark:bg-[#fec04b] dark:text-gray-900"
                      : "hover:bg-[#fec04b] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
          </nav>

          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 px-4 mt-4">TV Shows</h3>
          <nav className="flex flex-col space-y-2 flex-grow">
            {navItems
              .filter(item => item.section === "tv")
              .map(item => (
                <Button
                  key={`${item.section}-${item.name}`}
                  onClick={() => setActive(`${item.section}-${item.name}`)}
                  className={`hover:bg-[#fec04b] hover:text-white bg-white text-black dark:text-white dark:bg-[#494949] justify-start text-left flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    active === `${item.section}-${item.name}`
                      ? "bg-[#fec04b] text-gray-900 dark:bg-[#fec04b] dark:text-gray-900"
                      : "hover:bg-[#fec04b] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Button>
              ))}
              
          </nav>
          <div className="pt-40 flex-shrink-0">
            <Button
              onClick={() => setActive("logout")}
              className="hover:bg-[#fec04b] hover:text-white bg-white text-black dark:text-white dark:bg-[#494949] sm:justify-start text-left sm:flex items-center space-x-3 sm:px-4 sm:py-3 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
          
        </aside>
        </div>
  );
};
export default Sidebar;

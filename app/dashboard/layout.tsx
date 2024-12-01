"use client"
import Sidebar from "@/app/dashboard/Sidebar";
import Header from "@/app/dashboard/Header";
import { useDashboardState } from "@/hooks/useDashboardState";
import { useLogin } from "@/hooks/useLogin";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, toggleSidebar, active, setActive } = useDashboardState();
  const { handleSignOut } = useLogin();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#494949]">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          active={active}
          setActive={setActive}
          handleSignOut={handleSignOut}
        />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
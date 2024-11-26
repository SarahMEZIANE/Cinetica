import { useState } from "react";

export const useDashboardState = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState("main-Discover");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return {
    sidebarOpen,
    toggleSidebar,
    active,
    setActive,
  };
};
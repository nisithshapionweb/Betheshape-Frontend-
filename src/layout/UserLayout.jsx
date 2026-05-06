import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const UserLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="lg:hidden navbar bg-white border-b border-gray-200 shadow-sm w-full flex justify-between items-center fixed top-0 left-0 z-[100] h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden hover:bg-blue-50 bg-blue-100 transition-colors rounded-md px-3 py-2 cursor-pointer"
              onClick={handleSidebarToggle}
              aria-label="Toggle sidebar"
            >
              <FaBars className="w-6 h-6 text-blue-700" />
            </button>
          </div>
        </div>

        {/* Outlet/Main Content */}
        <div className="flex-1 overflow-y-auto px-3 lg:px-8 lg:ml-64 pt-4 lg:pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

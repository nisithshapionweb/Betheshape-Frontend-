


import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex bg-gray-900 min-h-screen overflow-x-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 bg-[#edf7f4]">

        {/* Navbar */}
        <nav className="fixed top-0 left-0 lg:left-64 right-0 h-14 md:h-16 bg-white border-b border-gray-300 z-[100] shadow-md flex justify-between items-center px-3 md:px-6">
          
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden text-indigo-800 hover:bg-indigo-100 rounded-md p-2"
              onClick={handleSidebarToggle}
            >
              <FaBars className="w-5 h-5 text-[#1f4e43]" />
            </button>

            <p className="text-sm md:text-base font-medium text-gray-800">
              Admin Dashboard
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-gray-600 text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
              {user?.displayName}
            </span>

            <button
              onClick={logout}
              className="bg-indigo-600 text-white px-2.5 md:px-3 py-1 rounded-md text-xs md:text-sm hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-grow pt-16 md:pt-20 pb-16 px-3 sm:px-6 w-full max-w-screen-2xl mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 lg:left-64 right-0 bg-indigo-100 border-t border-indigo-700 py-2 md:py-3 text-center text-xs md:text-sm text-gray-800">
          © {new Date().getFullYear()} Admin Dashboard — Built with ❤️ by Mozammel Hosen
        </footer>

      </div>
    </div>
  );
};

export default AdminLayout;
import {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import type { ReactNode } from "react";

import {
  LayoutDashboard,
  Users,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({
  children,
}: Props) => {
  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") ===
        "dark"
    );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    localStorage.removeItem("role");

const navigate = useNavigate();

navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Sidebar */}
      <aside className="w-56 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">

            <h1 className="text-2xl font-bold text-blue-600">
              Smart Leads
            </h1>

          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-3">

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium transition">

              <LayoutDashboard size={20} />

              Dashboard

            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition">

              <Users size={20} />

              Leads

            </button>

          </nav>

        </div>

        {/* Bottom Buttons */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">

          {/* Dark Mode */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800 dark:bg-white dark:text-black text-white transition"
          >
            {darkMode ? (
              <>
                <Sun size={18} />
                Light Mode
              </>
            ) : (
              <>
                <Moon size={18} />
                Dark Mode
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">

        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex justify-between items-center transition">

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">

            Dashboard

          </h2>

        <div className="flex items-center gap-3">
            <div className="text-right">

  <p className="font-semibold text-sm">
    {localStorage.getItem("role")}
  </p>

  <p className="text-xs text-gray-500">
    User Role
  </p>

</div>
</div>
<div className="relative group">

  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer">
    {localStorage
      .getItem("email")
      ?.charAt(0)
      .toUpperCase()}
  </div>

  <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50">
    {localStorage.getItem("email")}
  </div>

</div>

        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 text-gray-800 dark:text-gray-100 transition">

          {children}

        </div>
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
  © 2026 Smart Leads Dashboard. Built with MERN + TypeScript.
</footer>

      </main>

    </div>
  );
};

export default DashboardLayout;
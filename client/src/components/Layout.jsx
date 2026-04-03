import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Footer = () => (
  <footer className="mt-12 border-t border-gray-100 bg-white">
    <div className="max-w-screen-lg mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
      <p>
        &copy; {new Date().getFullYear()} MLB Stats Tracker. Built for portfolio use only — not affiliated with MLB.
      </p>
      <div className="flex items-center gap-4">
        <span>
          Data:{" "}
          <a
            href="https://statsapi.mlb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            MLB Stats API
          </a>
        </span>
        <span>
          Logos:{" "}
          <a
            href="https://www.mlbstatic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            mlbstatic.com
          </a>
        </span>
        <span>
          DB:{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            Supabase
          </a>
        </span>
      </div>
    </div>
  </footer>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

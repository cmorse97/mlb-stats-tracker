import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaBaseballBall } from "react-icons/fa";

const pages = [
  { name: "Home", path: "" },
  { name: "Standings", path: "standings" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    path === "" ? location.pathname === "/" : location.pathname.startsWith(`/${path}`);

  return (
    <nav className="sticky top-0 z-40 bg-slate-900 shadow-md">
      <div className="max-w-screen-lg flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-slate-300 transition-colors"
        >
          <FaBaseballBall className="text-lg" />
          <span className="text-base font-bold tracking-wide">MLB Stats Tracker</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={`/${page.path}`}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                isActive(page.path)
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>

        {/* Mobile button */}
        <button
          className="text-white sm:hidden"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-slate-800 px-4 pb-4 pt-2 space-y-1">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={`/${page.path}`}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive(page.path)
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { MdMultilineChart } from "react-icons/md";

const pages = [
  { name: "Home", path: "" },
  { name: "Standings", path: "standings" },
  { name: "Top 100", path: "top100" },
  { name: "Analytics", path: "analytics" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <nav className="text-white bg-blue-900 shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center gap-2 text-white">
          <MdMultilineChart className="text-2xl" />
          <span className="text-xl font-bold">MLB Stats Tracker</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden gap-6 sm:flex">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={`/${page.path}`}
              className="transition duration-200 hover:text-blue-300"
            >
              {page.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white sm:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <HiOutlineMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="px-4 py-3 space-y-3 text-white bg-blue-800 sm:hidden">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={`/${page.path}`}
              className="block w-full transition duration-200 hover:text-blue-300"
              onClick={toggleMobileMenu}
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

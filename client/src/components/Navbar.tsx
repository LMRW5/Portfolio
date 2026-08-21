import { NavLink } from "react-router-dom";

export function Navbar() {
  // Common style string for clean animated links
  const linkStyle =
    "relative font-medium transition-colors duration-300 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:transition-transform after:duration-300 after:ease-out";

  return (
    <nav className="flex items-center gap-6 px-6 py-4 bg-gray-900 text-white border-b border-gray-800 justify-center  ">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "after:scale-x-100 after:bg-blue-500"
              : "text-gray-300 hover:text-white after:scale-x-0 after:bg-blue-500 hover:after:scale-x-100"
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/projects"
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "after:scale-x-100 after:bg-blue-500"
              : "text-gray-300 hover:text-white after:scale-x-0 after:bg-blue-500 hover:after:scale-x-100"
          }`
        }
      >
        Projects
      </NavLink>

      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "after:scale-x-100 after:bg-blue-500"
              : "text-gray-300 hover:text-white after:scale-x-0 after:bg-blue-500 hover:after:scale-x-100"
          }`
        }
      >
        Gallery
      </NavLink>
    </nav>
  );
}
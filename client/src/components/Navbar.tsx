import { NavLink } from "react-router-dom";

export function Navbar() {
  const linkStyle =
    "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300";

  return (
    <nav className="flex items-center justify-between pt-6 sm:pt-8 sm:pb-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7c7469]">
        Portfolio
      </span>
      <div className="flex items-center gap-1">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkStyle} ${
            isActive
              ? "bg-[#1b1a18] text-[#f4f1eb] shadow-md shadow-[#1b1a18]/20"
              : "text-[#7c7469] hover:bg-[#e7e1d8] hover:text-[#1b1a18] hover:scale-105"
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
              ? "bg-[#1b1a18] text-[#f4f1eb] shadow-md shadow-[#1b1a18]/20"
              : "text-[#7c7469] hover:bg-[#e7e1d8] hover:text-[#1b1a18] hover:scale-105"
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
              ? "bg-[#1b1a18] text-[#f4f1eb] shadow-md shadow-[#1b1a18]/20"
              : "text-[#7c7469] hover:bg-[#e7e1d8] hover:text-[#1b1a18] hover:scale-105"
          }`
        }
      >
        Gallery
      </NavLink>
      </div>
    </nav>
  );
}
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export function MainTemplate() {
  const name = "Ryan Wu";
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navbar Container */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Responsive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          
          {/* Interactive Proximity-Based Name Header */}
          <div className="relative group cursor-pointer inline-block py-1">
            <h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight flex items-center select-none"
              onMouseLeave={() => setHoverIndex(null)}
            >
              {name.split("").map((char, i) => {
                // Calculate distance from currently hovered letter index
                const distance = hoverIndex !== null ? Math.abs(hoverIndex - i) : null;

                let translateY = "translate-y-0";
                let scale = "scale-100";
                let rotate = "rotate-0";

                if (distance === 0) {
                  // Direct cursor target letter
                  translateY = "-translate-y-3";
                  scale = "scale-125";
                  rotate = "-rotate-3";
                } else if (distance === 1) {
                  // Neighboring letters (ripple effect)
                  translateY = "-translate-y-1.5";
                  scale = "scale-110";
                  rotate = "rotate-1";
                }

                return (
                  <span
                    key={i}
                    onMouseEnter={() => setHoverIndex(i)}
                    className={`inline-block transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${translateY} ${scale} ${rotate} ${
                      char === " " ? "w-2.5" : ""
                    } hover:text-cyan-500 dark:hover:text-cyan-400`}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>

            {/* Accent Underline */}
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-cyan-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a
              href="https://linkedin.com/in/ryan-wu88"
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-medium text-xs sm:text-sm md:text-base transition-colors duration-300 hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400">
                <FaLinkedin className="text-base sm:text-lg" />
                <span>LinkedIn</span>
              </div>
            </a>

            <a
              href="https://github.com/LMRW5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-medium text-xs sm:text-sm md:text-base transition-colors duration-300 hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400">
                <FaGithub className="text-base sm:text-lg" />
                <span>GitHub</span>
              </div>
            </a>

            <a
              href="https://devpost.com/LMRW5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-medium text-xs sm:text-sm md:text-base transition-colors duration-300 hover:text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-blue-500 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400">
                <SiDevpost className="text-base sm:text-lg" />
                <span>Devpost</span>
              </div>
            </a>
          </div>
        </div>

        {/* Dynamic Route Content */}
        <div className="pt-2">
          <Outlet />
        </div>
      </main>

      {/* Bottom Footer Container */}
      <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
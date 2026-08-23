import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export function MainTemplate() {
  const name = "Ryan Wu";
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col text-[#1b1a18]">
      <AnimatedBackground />

      {/* Top Navbar Container */}
      <header className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <Navbar />
      </header>

      {/* Main Content Area - Reduced top padding to sit right under navbar */}
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pt-2 sm:pt-3 pb-8 sm:px-8 lg:px-10">
        {/* Header Section */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d8d1c6] pb-4 sm:flex-row sm:items-end animate-fade-up">
          
          {/* Interactive Proximity-Based Name */}
          <div className="relative group cursor-pointer inline-block">
            <h1 
              className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.06em] sm:text-6xl flex items-center select-none"
              onMouseLeave={() => setHoverIndex(null)}
            >
              {name.split("").map((char, i) => {
                const distance = hoverIndex !== null ? Math.abs(hoverIndex - i) : null;

                let translateY = "translate-y-0";
                let scale = "scale-100";
                let rotate = "rotate-0";

                if (distance === 0) {
                  translateY = "-translate-y-3";
                  scale = "scale-110";
                  rotate = "-rotate-2";
                } else if (distance === 1) {
                  translateY = "-translate-y-1.5";
                  scale = "scale-105";
                  rotate = "rotate-1";
                }

                return (
                  <span
                    key={i}
                    onMouseEnter={() => setHoverIndex(i)}
                    className={`inline-block transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${translateY} ${scale} ${rotate} ${
                      char === " " ? "w-3 sm:w-4" : ""
                    } hover:text-[#b64b32]`}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#7c7469] pb-1 stagger-children">
            <a
              href="https://linkedin.com/in/ryan-wu88"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:text-[#b64b32] hover:translate-x-1"
            >
              <div className="flex items-center gap-2">
                <FaLinkedin />
                <span className="hover-underline">LinkedIn</span>
              </div>
            </a>

            <a
              href="https://github.com/LMRW5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:text-[#b64b32] hover:translate-x-1"
            >
              <div className="flex items-center gap-2">
                <FaGithub />
                <span className="hover-underline">GitHub</span>
              </div>
            </a>

            <a
              href="https://devpost.com/LMRW5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:text-[#b64b32] hover:translate-x-1"
            >
              <div className="flex items-center gap-2">
                <SiDevpost />
                <span className="hover-underline">Devpost</span>
              </div>
            </a>
          </div>
        </div>

        {/* Dynamic Route Content */}
        <div>
          <Outlet />
        </div>
      </main>

      {/* Footer Container */}
      <footer className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <Footer />
      </footer>
    </div>
  );
}
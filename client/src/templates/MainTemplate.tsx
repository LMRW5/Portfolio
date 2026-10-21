import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export function MainTemplate() {
  const name = "Ryan Wu";
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <LayoutGroup id="portfolio-name">
    <div className="relative flex min-h-screen flex-col text-[#1b1a18]">
      <AnimatedBackground />

      {/* Top Navbar Container */}
      <header className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <Navbar />
      </header>

      {/* Main Content Area - Reduced top padding to sit right under navbar */}
      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-5 pt-2 sm:pt-3 pb-8 sm:px-8 lg:px-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d8d1c6] pb-4 sm:flex-row sm:items-end"
        >
          
          {/* Shared name moves between the home intro and page header */}
          {!isHome && (
            <div className="relative group cursor-pointer inline-block">
              <motion.h1
                layoutId="ryan-name"
                className="font-['Space_Grotesk'] text-4xl font-bold tracking-[-0.06em] sm:text-6xl flex items-center select-none"
                onMouseLeave={() => setHoverIndex(null)}
              >
                {name.split("").map((char, i) => {
                const distance = hoverIndex !== null ? Math.abs(hoverIndex - i) : null;

                let translateY = 0;
                let scale = 1;
                let rotate = 0;

                if (distance === 0) {
                  translateY = -12;
                  scale = 1.1;
                  rotate = -2;
                } else if (distance === 1) {
                  translateY = -6;
                  scale = 1.05;
                  rotate = 1;
                }

                return (
                  <motion.span
                    key={i}
                    onMouseEnter={() => setHoverIndex(i)}
                    animate={{ y: translateY, scale, rotate }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`inline-block ${char === " " ? "w-3 sm:w-4" : ""} hover:text-[#b64b32]`}
                  >
                    {char}
                  </motion.span>
                );
                })}
              </motion.h1>
            </div>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#7c7469] pb-1">
            {[
              { href: "https://linkedin.com/in/ryan-wu88", icon: <FaLinkedin />, label: "LinkedIn" },
              { href: "https://github.com/LMRW5", icon: <FaGithub />, label: "GitHub" },
              { href: "https://devpost.com/LMRW5", icon: <SiDevpost />, label: "Devpost" },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                whileHover={{ x: 4, color: "#b64b32" }}
                className="inline-flex items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span className="hover-underline">{link.label}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

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
    </LayoutGroup>
  );
}
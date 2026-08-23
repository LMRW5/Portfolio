import { useState } from "react";
import { FaCopy, FaCheck, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "ryan.wu51299@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="mt-8 w-full py-6">
      <div className="animated-divider" />
      <div className="flex flex-col items-center justify-between gap-4 text-xs text-[#7c7469] sm:flex-row sm:text-sm">
        
        {/* Left: Branding Badge */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Ryan Wu / 2026</span>
        </div>

        {/* Right: Interactive Email Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Get in touch</span>
          
          <div className="inline-flex items-center gap-2 text-[#1b1a18]">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#b64b32] transition-all duration-300 hover:translate-x-1"
              title="Send email"
            >
              <FaEnvelope className="text-xs text-slate-400 dark:text-slate-500" />
              <span>{email}</span>
            </a>

            <span className="text-[#d8d1c6]">/</span>

            <button
              onClick={handleCopy}
              className="p-1 transition-all duration-300 hover:text-[#b64b32] hover:scale-110"
              aria-label="Copy email address"
              title="Copy to clipboard"
            >
              {copied ? (
                <FaCheck className="text-emerald-500 text-xs" />
              ) : (
                <FaCopy className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" />
              )}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
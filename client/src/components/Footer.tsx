import { useState } from "react";
import { FaCopy, FaCheck, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "ryanr.wu@mail.utoronto.ca";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 w-full pb-8 pt-6">
      <div className="animated-divider mb-5" />
      <div className="flex flex-col items-center justify-between gap-6 text-xs text-[#7c7469] sm:flex-row sm:gap-4 sm:text-sm">
        
        {/* Left: Branding Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:order-2 sm:justify-end">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Ryan Wu</span>
          <div className="group inline-flex items-center gap-2 rounded-full border border-[#d8d1c6] bg-[#faf8f4]/70 px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b64b32] hover:shadow-[0_4px_12px_rgba(182,75,50,0.12)]">
            <a className="px-1 transition-colors hover:text-[#b64b32]" href="https://uoftwebring.com/redirect?nav=prev&id=56" aria-label="Previous site in UofT Webring">
              ←
            </a>
            <a className="flex items-center" href="https://uoftwebring.com" target="_blank" rel="noopener noreferrer" aria-label="UofT Webring home">
              <img
                src="https://uoftwebring.com/ring_logo.svg"
                alt="UofT Webring"
                className="w-6 h-auto transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
              />
            </a>
            <a className="inline-flex items-center px-1 transition-[transform,color] duration-200 hover:translate-x-1 hover:text-[#b64b32]" href="https://uoftwebring.com/redirect?nav=next&id=56" aria-label="Next site in UofT Webring">
              →
            </a>
          </div>
        </div>

        {/* Right: Interactive Email Container */}
        <div className="flex flex-col items-center gap-2 sm:order-1 sm:items-start sm:gap-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Get in touch</span>
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
              className="p-1 transition-all duration-300 hover:text-[#b64b32] hover:scale-110 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b64b32] focus:ring-offset-2"
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
    </div>
  );
}

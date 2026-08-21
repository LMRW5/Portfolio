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
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors py-6 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
        
        {/* Left: Branding Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>Built without Claude</span>
        </div>

        {/* Right: Interactive Email Container */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-slate-400 dark:text-slate-500">email:</span>
          
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-200/60 dark:bg-slate-800/60 px-2.5 py-1 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-slate-700/50 transition-colors">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              title="Send email"
            >
              <FaEnvelope className="text-xs text-slate-400 dark:text-slate-500" />
              <span>{email}</span>
            </a>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <button
              onClick={handleCopy}
              className="p-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
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
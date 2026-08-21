import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaInstagram,
  FaBookReader,
  FaCode,
  FaTrophy,
  FaArrowRight,
  FaTerminal,
} from "react-icons/fa";

export function Home() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200 max-w-3xl text-sm leading-relaxed">
      
      {/* Campus Banner Image */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-lg">
        <img
          src="https://thevarsity.ca/wp-content/uploads/2019/08/ROGUE_UTSC_9_to_9-SHANNA_HUNTERTHE_VARSITY-UTSC_front_campus-scaled.jpg"
          alt="University of Toronto Scarborough Campus"
          className="w-full h-56 sm:h-64 object-cover group-hover:scale-[1.02] transition-transform duration-700 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* Intro Line */}
      <div className="space-y-3">
        <p className="flex items-center gap-2 flex-wrap">
          <span>computer science co-op stream @</span>
          <a
            href="https://www.utsc.utoronto.ca/cms/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <FaGraduationCap />
            University of Toronto Scarborough
          </a>
          <span className="inline-flex items-center rounded-full bg-slate-200/80 dark:bg-slate-800/80 px-2.5 py-0.5 text-xs font-mono text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
            2026 cohort
          </span>
        </p>
      </div>

     

      {/* What I've Done */}
      <div className="">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          previously:
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-400">
          <li>
            won 1st place @{" "}
            <a
              href="https://www.utsc.utoronto.ca/mgmt/be-unlimited/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 text-xs font-medium hover:bg-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaTrophy /> UTSC BE-UNLIMITED Case Competition
            </a>
          </li>
          <li>
            12 million+ views creating formula one content @{" "}
            <a
              href="https://www.instagram.com/skewteria/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 text-xs font-medium hover:bg-pink-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            ex-marketing intern @{" "}
            <a
              href="https://sites.google.com/view/23e2/home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaBriefcase /> 23e2 Digital
            </a>
          </li>
          <li>
            Leading to Reading Volunteer @{" "}
            <a
              href="https://tpl.ca/support-us/volunteering/leading-to-reading/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-medium hover:bg-amber-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaBookReader /> Toronto Public Library
            </a>{" "}
            for 3+ years
          </li>
          <li>
            completed coursework in CS50x, CS50P, and CS50AI @{" "}
            <a
              href="https://cs50.harvard.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-medium hover:bg-red-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaCode /> Harvard CS50
            </a>
          </li>
          <li>
            finished{" "}
            <a
              href="https://leetcode.com/studyplan/leetcode-75/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-medium hover:bg-yellow-500/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaCode /> LeetCode
            </a>{" "}
            75
          </li>
          <li>
            participated in various school clubs & received academic awards
          </li>
        </ul>
      </div>

      {/* Personal / Outside Work */}
      <div className="space-y-2">
        <h2 className="font-semibold text-slate-900 dark:text-white">
          other stuff:
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-400">
          <li>9k trophies in clash royale</li>
          <li>maxed out TH12 in clash of clans</li>
          <li>150 lb bench press</li>
        </ul>
      </div>

      {/* HIGH-CONTRAST BASH TERMINAL CTA */}
      <div className="pt-4">
        <div className="p-5 rounded-xl bg-slate-950 border-2 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-mono text-sm relative overflow-hidden group">
          
          {/* Subtle Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

          {/* Window Header Controls */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[11px] text-cyan-400/80 font-bold tracking-wider flex items-center gap-1.5">
              <FaTerminal className="text-[10px]" /> bash ~ portfolio
            </span>
          </div>

          {/* Command Prompt and Button Container */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-cyan-300 font-semibold">./explore_projects.sh</span>
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all duration-200 hover:scale-105 shadow-md shadow-cyan-500/20"
            >
              <span>View Projects</span>
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
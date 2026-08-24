import {
  FaGraduationCap,
  FaBriefcase,
  FaInstagram,
  FaBookReader,
  FaCode,
  FaTrophy,
  FaArrowRight,
  FaGamepad,
  FaDumbbell,
} from "react-icons/fa";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { motion } from "framer-motion";

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AchievementCard({
  href,
  icon,
  title,
  subtitle,
  borderColor,
  shadowColor,
  iconBg,
  iconColor,
  arrowColor,
  index = 0,
}: {
  href?: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  borderColor: string;
  shadowColor: string;
  iconBg: string;
  iconColor: string;
  arrowColor: string;
  index?: number;
}) {
  const cardClasses = "group achievement-card flex items-center gap-4 rounded-xl border border-[#d8d1c6] bg-[#faf8f4] p-4";
  
  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, scale: 1.01 }}
        className={`${cardClasses} hover:${borderColor} ${shadowColor}`}
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1b1a18]">{title}</p>
          <p className="text-xs text-[#7c7469] truncate">{subtitle}</p>
        </div>
        <FaArrowRight className={`shrink-0 text-xs text-[#d8d1c6] transition-all duration-300 group-hover:translate-x-1 group-hover:${arrowColor}`} />
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${cardClasses}`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1b1a18]">{title}</p>
        <p className="text-xs text-[#7c7469] truncate">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export function Home() {
  return (
    <div className="max-w-3xl space-y-14 text-sm leading-relaxed text-[#4f4a43]">

      {/* Campus Banner Image */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group banner-depth relative overflow-hidden rounded-lg border border-[#d8d1c6] bg-[#e7e1d8]"
        >
          <img
            src="https://thevarsity.ca/wp-content/uploads/2019/08/ROGUE_UTSC_9_to_9-SHANNA_HUNTERTHE_VARSITY-UTSC_front_campus-scaled.jpg"
            alt="University of Toronto Scarborough Campus"
            className="h-56 w-full object-cover brightness-[0.92] transition-transform duration-700 group-hover:scale-[1.05] sm:h-72"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" style={{transition: 'opacity 0.7s, transform 1.2s ease'}} />
        </motion.div>
      </Section>

      {/* Intro */}
      <Section delay={100}>
        <div className="space-y-3">
          <p className="flex items-center gap-2 flex-wrap text-[15px]">
            <span>computer science co-op stream @</span>
            <a
              href="https://www.utsc.utoronto.ca/cms/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 hover:scale-[1.02] badge-glow"
            >
              <FaGraduationCap />
              University of Toronto Scarborough
            </a>
            <span className="inline-flex items-center rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-mono text-slate-600 border border-slate-300">
              2026 cohort
            </span>
          </p>
        </div>
      </Section>

      {/* What I've Done */}
      <Section delay={200}>
        <div>
          <h2 className="mb-5 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#1b1a18] section-heading">
            previously:
          </h2>
          <AchievementCard
              index={4}
              href="https://cs50.harvard.edu/"
              icon={<FaCode />}
              title="CS50x, CS50P, CS50AI"
              subtitle="Harvard University · Coursework"
              borderColor="hover:border-red-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(239,68,68,0.08)]"
              iconBg="bg-red-500/10"
              iconColor="text-red-500"
              arrowColor="text-red-500"
            />
            <AchievementCard
              index={5}
              href="https://leetcode.com/studyplan/leetcode-75/"
              icon={<FaCode />}
              title="LeetCode 75 Completed"
              subtitle="Problem Solving"
              borderColor="hover:border-yellow-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(234,179,8,0.08)]"
              iconBg="bg-yellow-500/10"
              iconColor="text-yellow-600"
              arrowColor="text-yellow-600"
            />
                        <AchievementCard
              index={2}
              href="https://sites.google.com/view/23e2/home"
              icon={<FaBriefcase />}
              title="Ex-Marketing Intern"
              subtitle="23e2 Digital"
              borderColor="hover:border-emerald-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(16,185,129,0.08)]"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-500"
              arrowColor="text-emerald-500"
            />
         
            <AchievementCard
              index={1}
              href="https://www.instagram.com/skewteria/"
              icon={<FaInstagram />}
              title="12M+ Views on Formula One Content"
              subtitle="Instagram · Content Creator"
              borderColor="hover:border-pink-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(236,72,153,0.08)]"
              iconBg="bg-pink-500/10"
              iconColor="text-pink-500"
              arrowColor="text-pink-500"
            />

            <AchievementCard
              index={3}
              href="https://tpl.ca/support-us/volunteering/leading-to-reading/"
              icon={<FaBookReader />}
              title="Leading to Reading Volunteer"
              subtitle="Toronto Public Library · 3+ years"
              borderColor="hover:border-amber-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(245,158,11,0.08)]"
              iconBg="bg-amber-500/10"
              iconColor="text-amber-500"
              arrowColor="text-amber-500"
            />
             <div className="space-y-3">
            <AchievementCard
              index={0}
              href="https://www.utsc.utoronto.ca/mgmt/be-unlimited/"
              icon={<FaTrophy />}
              title="Winner, 1st/84 teams"
              subtitle="UTSC BE-UNLIMITED Case Competition"
              borderColor="hover:border-purple-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(168,85,247,0.08)]"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-500"
              arrowColor="text-purple-500"
            />
            
            <AchievementCard
              index={6}
              icon={<FaTrophy />}
              title="School Clubs & Academic Awards"
              subtitle="Various extracurriculars"
              borderColor="hover:border-slate-400"
              shadowColor="hover:shadow-[0_4px_20px_rgba(100,116,139,0.08)]"
              iconBg="bg-slate-100"
              iconColor="text-[#7c7469]"
              arrowColor="text-slate-400"
            />
          </div>
        </div>
      </Section>

      {/* Personal / Outside Work */}
      <Section delay={250}>
        <div>
          <h2 className="mb-5 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#1b1a18] section-heading">
            other stuff:
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 grid-stagger">
            {[
              { icon: <FaGamepad className="shrink-0 text-lg text-orange-500" />, title: "9K Trophies", sub: "Clash Royale", hover: "hover:border-orange-400" },
              { icon: <FaGamepad className="shrink-0 text-lg text-green-600" />, title: "Maxed TH12", sub: "Clash of Clans", hover: "hover:border-green-400" },
              { icon: <FaDumbbell className="shrink-0 text-lg text-rose-500" />, title: "150 LB Bench", sub: "Gym", hover: "hover:border-rose-400" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`flex items-center gap-3 personal-card rounded-xl border border-[#d8d1c6] bg-[#faf8f4] p-4 ${item.hover}`}
              >
                {item.icon}
                <div>
                  <p className="text-sm font-medium text-[#1b1a18]">{item.title}</p>
                  <p className="text-xs text-[#7c7469]">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>



    </div>
  );
}

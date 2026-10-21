import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaJava } from "react-icons/fa";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiPostgresql,
  SiSqlite,
  SiGooglegemini,
  SiMediapipe,
  SiC,
  SiExpress,
  SiScikitlearn,
  SiOpencv,
  SiFirebase,
  SiMongodb,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import { useScrollReveal } from "../hooks/useScrollReveal";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
};

function Section({ children, delay = 0 }: RevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

type Brand = {
  name: string;
  initials: string;
  color: string;
  href: string;
  logoSrc?: string;
};

type Experience = {
  title: string;
  organization: Brand;
  detail: string;
};

type CurrentRole = Experience;

type Skill = {
  name: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false"; style?: React.CSSProperties }>;
  color: string;
};

type SkillGroup = {
  area: string;
  skills: Skill[];
};

function BrandLink({ brand }: { brand: Brand }) {
  return (
    <a
      href={brand.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-fit items-center gap-2 text-sm text-[#315b49] underline decoration-[#315b49]/35 underline-offset-4 transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-[#1b1a18] hover:decoration-[#315b49] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315b49]"
      aria-label={`Visit ${brand.name}`}
    >
      {brand.logoSrc ? (
        <img
          src={brand.logoSrc}
          alt=""
          className="h-7 w-7 shrink-0 rounded-md object-contain transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md border px-1.5 font-['Space_Grotesk'] text-[11px] font-bold transition-transform duration-200 ease-out group-hover:scale-110 motion-reduce:transition-none"
          style={{ color: brand.color, borderColor: `${brand.color}55`, backgroundColor: `${brand.color}12` }}
        >
          {brand.initials}
        </span>
      )}
      <span className="transition-[text-decoration-color] duration-200 group-hover:underline group-hover:decoration-current motion-reduce:transition-none">{brand.name}</span>
    </a>
  );
}

const currentRoles: CurrentRole[] = [
  {
    title: "Software Engineering Team Lead",
    organization: {
      name: "CREATE UofT",
      initials: "C",
      color: "#3474a5",
      href: "https://create.utsc.utoronto.ca/",
      logoSrc: "https://media.licdn.com/dms/image/v2/D4D0BAQG-Ux1bQcZ8BA/company-logo_100_100/company-logo_100_100/0/1710642011404?e=1794441600&v=beta&t=CN2lHpf_qMkyWYF7CJOUqp4cj15i2AnWJIrF6tKllJY",
    },
    detail: "Leading software developement for team of 7 of CREATE UofT’s 2026-2027 season, building a kareoke coach machine learning application.",
  },
  {
    title: "Director of Technology",
    organization: {
      name: "Web3 Student Group at UofT",
      initials: "W3",
      color: "#7253a3",
      href: "https://www.web3uoft.com/",
      logoSrc: "https://media.licdn.com/dms/image/v2/D4D0BAQFeLDcvMsxvqA/company-logo_100_100/company-logo_100_100/0/1688323383659/web3uoft_logo?e=1794441600&v=beta&t=LSmcYaU-vVAqZiizT6bGkKSru3JpEZg9Pt-0cVu7tr4",
    },
    detail: "Leading the technology team for Web3 Student Group at UofT, managing current software applications and helping organize Web3's flagship Da-Vinci Hackathon.",
  },
];

const experience: Experience[] = [
  {
    title: "CS50x, CS50P and CS50AI",
    organization: {
      name: "Harvard University's CS50",
      initials: "CS50",
      color: "#a51c30",
      href: "https://www.harvard.edu/",
      logoSrc: "https://media.licdn.com/dms/image/v2/C4E0BAQGYjmmBCvqLmg/company-logo_200_200/company-logo_200_200/0/1631309789389?e=2147483647&v=beta&t=bVN13LelDgaarAXt7VYdmBiIQDPBrbYgN-ED0mTnED0",
    },
    detail: "Completed three introductory programs taught by Harvard University's CS50 team, spanning foundational computer science, Python development, and artificial intelligence.",
  },
  {
    title: "Marketing intern",
    organization: {
      name: "23e2 Digital",
      initials: "23",
      color: "#42c742",
      href: "https://sites.google.com/view/23e2/home",
      logoSrc: "https://media.licdn.com/dms/image/v2/D560BAQGBvr694gkn4Q/company-logo_100_100/B56ZWcntpiHsAU-/0/1742089411468/23e2_digital_logo?e=1794441600&v=beta&t=M53lkLPRl2q1CC6-gGdmaR3yQOfyt0FDnvHlha4Qyz0",
    },
    detail: "Managed google ads campagins for cleints, optimized ad performance, and created marketing content for social media platforms.",
  },
  {
    title: "Formula One content creator",
    organization: {
      name: "Instagram",
      initials: "IG",
      color: "#b64b74",
      href: "https://www.instagram.com/skewteria/",
      logoSrc: "https://media.licdn.com/dms/image/v2/C4E0BAQFt6KqGwvGCzg/company-logo_100_100/company-logo_100_100/0/1652805738201/instagram_logo?e=1794441600&v=beta&t=0yKpslYVo5Gj50K6up8_mSbKTmzIsddXlRK4vWMeVXY",
    },
    detail: "Produced Formula One videos and posts for Instagram, building a total audience reach of more than 12 million views.",
  },
  {
    title: "Leading to Reading volunteer",
    organization: {
      name: "Toronto Public Library",
      initials: "TPL",
      color: "#397451",
      href: "https://tpl.ca/",
      logoSrc: "https://media.licdn.com/dms/image/v2/C560BAQEs13uvVuAfoQ/company-logo_100_100/company-logo_100_100/0/1630634767997/toronto_public_library_logo?e=1794441600&v=beta&t=sBiwmfeOcNOYzpHBDWsvHrq1uk3rT6dai0I-c2sFFB4",
    },
    detail: "Teaching young readers to build confidence with reading through the Toronto Public Library’s Leading to Reading volunteer program.",
  },
  {
    title: "Youth Council Executive",
    organization: {
      name: "SLYE Network",
      initials: "SLYE",
      color: "#979704",
      href: "https://www.toronto.ca/explore-enjoy/parks-recreation/places-spaces/parks-and-recreation-facilities/location/?id=788&title=L%27Amoreaux-Community-Recreation-Centre",
      logoSrc: "https://media.licdn.com/dms/image/v2/C560BAQGvX9W1CrhIgQ/company-logo_100_100/company-logo_100_100/0/1631314271598?e=1794441600&v=beta&t=n0Sa9ne7Gnq3dZWxD11_YCathfyxB0J9mIkGd3khs_A",
    },
    detail: "Organizing community events and programs for youth at the L'Amoreaux community center. Hosted events like a volleyball tournament and a youth paint night.",
  },
];

function LinkedInPost() {
  return (
    <iframe
      src="https://widgets.sociablekit.com/linkedin-profile-posts/iframe/25723263"
      title="Ryan Wu’s LinkedIn posts"
      width="100%"
      height="540"
      loading="lazy"
      className="block w-full border-0"
    />
  );
}

const skillGroups: SkillGroup[] = [
  {
    area: "Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#b08a00" },
      { name: "C", icon: SiC, color: "#5c6bc0" },
      { name: "Java", icon: FaJava, color: "#e76f00" },
    ],
  },
  {
    area: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#149eca" },
      { name: "Next.js", icon: SiNextdotjs, color: "#1b1a18" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06a6c9" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: SiCss, color: "#663399" },
    ],
  },
  {
    area: "Backend & data",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#15998b" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169a1" },
      { name: "SQLite", icon: SiSqlite, color: "#3b83b5" },
      { name: "Express.js", icon: SiExpress, color: "#1b1a18" },
      { name: "Firebase", icon: SiFirebase, color: "#dd2c00" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    ],
  },
  {
    area: "AI & media",
    skills: [
      { name: "Gemini API", icon: SiGooglegemini, color: "#6575d8" },
      { name: "MediaPipe", icon: SiMediapipe, color: "#168b7b" },
      { name: "Web Audio API", icon: SiJavascript, color: "#b08a00" },
      { name: "scikit-learn", icon: SiScikitlearn, color: "#f7931e" },
      { name: "OpenCV", icon: SiOpencv, color: "#5c3ee8" },
    ],
  },
];

export function Home() {
  const sectionHeading = "font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#1b1a18] sm:text-xl";
  const rowHeading = "flex flex-wrap items-center gap-x-2 gap-y-1 text-[#1b1a18]";
  const rowDetail = "max-w-2xl text-sm leading-6 text-[#6b655d]";

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-5xl space-y-14 text-left text-sm leading-relaxed text-[#4f4a43] sm:space-y-16">
        <Section>
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <h2 className="max-w-lg font-['Space_Grotesk'] text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#1b1a18] sm:text-5xl lg:text-[3.5rem]">
                Hi, my name is <motion.span layoutId="ryan-name" className="inline-block">Ryan Wu</motion.span>.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-7 text-[#4f4a43]">
                I’m currently studying computer science at the University of Toronto. I love working with software, learning new technologies, and building things along the way.
              </p>
              <Link
                to="/projects"
                className="group mt-7 inline-flex items-center gap-1 border-b border-[#315b49] pb-1 font-medium text-[#244b3a] transition-colors duration-200 hover:text-[#1b1a18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315b49] motion-reduce:transition-none"
              >
                See what I’ve built
                <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none">➔</span>
              </Link>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-md pb-7 pl-5 sm:pl-8"
            >
              <div className="h-[300px] overflow-hidden bg-[#dce2da] sm:h-[390px]">
                <img
                  src="https://thevarsity.ca/wp-content/uploads/2019/08/ROGUE_UTSC_9_to_9-SHANNA_HUNTERTHE_VARSITY-UTSC_front_campus-scaled.jpg"
                  alt="Campus buildings at the University of Toronto Scarborough"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-32 w-24 overflow-hidden border-[6px] border-[#f4f1eb] bg-[#dce2da] sm:h-40 sm:w-32">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQGYYUqZDrDUsA/profile-displayphoto-scale_400_400/B56Z8tv8AmGoAg-/0/1783178969516?e=1793836800&v=beta&t=ISBzXoLKjq4v50UxgFD6KRX-RbWh01m2ECeoyaujGaU" alt="Ryan Wu" className="h-full w-full object-cover" />
              </div>
              <figcaption className="absolute bottom-1 right-0 text-right text-xs text-[#7c7469]">
                University of Toronto Scarborough
              </figcaption>
            </motion.figure>
          </div>
        </Section>

        <Section delay={60}>
          <section className="grid gap-4 border-t border-[#d8d1c6] pt-5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-10">
            <h2 className={sectionHeading}>Currently:</h2>
            <ul>
              {currentRoles.map((position) => (
                <li key={position.organization.name} className="border-t border-[#d8d1c6] py-4 first:border-0 first:pt-0">
                  <p className={`${rowHeading} font-medium`}>
                    <span>{position.title}</span>
                    <span aria-hidden="true" className="text-[#7c7469]">at</span>
                    <BrandLink brand={position.organization} />
                  </p>
                  <p className={`mt-2 ${rowDetail}`}>{position.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </Section>

        <Section delay={100}>
          <section className="grid gap-4 border-t border-[#d8d1c6] pt-5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-10">
            <h2 className={sectionHeading}>Previously:</h2>
            <ul>
              {experience.map((item) => (
                <li key={item.title} className="border-t border-[#d8d1c6] py-4 first:border-0 first:pt-0">
                  <p className={`${rowHeading} font-medium`}>
                    <span>{item.title}</span>
                    <span aria-hidden="true" className="text-[#7c7469]">at</span>
                    <BrandLink brand={item.organization} />
                  </p>
                  <p className={`mt-2 ${rowDetail}`}>{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </Section>

        <Section delay={140}>
          <section className="border-t border-[#d8d1c6] pt-5">
            <LinkedInPost />
          </section>
        </Section>

        <Section delay={160}>
          <section className="grid gap-4 border-t border-[#d8d1c6] pt-5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-10">
            <h2 className={sectionHeading}>Tech stack</h2>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <li key={group.area} className="border-t border-[#d8d1c6] pt-3">
                  <p className="mb-3 font-medium text-[#1b1a18]">{group.area}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.skills.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <li key={skill.name} className="inline-flex items-center gap-1.5 text-xs text-[#6b655d]">
                          <Icon aria-hidden="true" className="text-sm" style={{ color: skill.color }} />
                          {skill.name}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </Section>
      </div>
    </MotionConfig>
  );
}

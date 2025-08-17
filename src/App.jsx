import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  ArrowRight,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
  Database,
  Boxes,
  Rocket,
} from "lucide-react";
import CubeCanvas from "./Cube.jsx";

const profile = {
  name: "Mridul Singhal",
  role: "Software / Backend Engineer",
  location: "Kolkata, India",
  email: "mridulsinghal474@gmail.com",
  phone: "+91 7015477816",
  github: "https://github.com/mridul45",
  linkedin: "https://www.linkedin.com/in/mridul-singhal-44aa62202/",
  resumeURL: "https://www.linkedin.com/in/mridul-singhal-44aa62202/",
  summary:
    "Backend‑leaning full‑stack developer building reliable, scalable services. I work across Django/FastAPI, Postgres/Redis, Docker/K8s and cloud (AWS/GCP). Recently: LLM infra, recommendation systems, and vision pipelines.",
};

const experiences = [
  {
    company: "LabOps",
    title: "Software Developer (Full‑time)",
    period: "Sep 2024 – Present",
    location: "Kolkata, India",
    bullets: [
      "Optimized APIs with PostgreSQL indexing, Redis caching, and query refactors for double‑digit latency cuts.",
      "Hardened Dockerized microservices with structured error handling and centralized alerting (Alertmanager).",
      "Built multi‑tenant RBAC on Django REST + PostgreSQL RLS with dynamic authorization policies.",
      "Fine‑tuned BioClinical BERT (Tf 2.x) on GCP; deployed scalable inference (AI Platform).",
      "Containerized Qwen3‑4B and served GPU‑backed endpoints on GKE/Cloud Run with autoscaling.",
      "Integrated ViT for dermatology; OpenCV preprocessing → TensorFlow Serving with versioned Docker images.",
      "Designed ranking & recommendations over chat logs (BigQuery + scikit‑learn) exposed via FastAPI.",
      "Implemented context‑window management and token‑aware history trimming for LLM chats.",
    ],
    stack: [
      "Python",
      "Django REST",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "TensorFlow",
      "scikit‑learn",
    ],
  },
  {
    company: "Writeroo",
    title: "Software Developer Intern",
    period: "Mar 2024 – Jun 2024",
    location: "Remote, India",
    bullets: [
      "Profiled and refactored slow Postgres queries for noticeably faster endpoints.",
      "Added Redis caching with safe invalidation for read‑heavy flows.",
      "Delivered DRF features: users, collaboration flows, and role‑based access.",
      "Fixed Docker networking bugs and improved local developer experience.",
    ],
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
];

const projects = [
  {
    title: "Online Voting with Visual Cryptography",
    description:
      "Prototype e‑voting with vote shares, encryption, and secure verification. Built with Django on AWS.",
    tags: ["Django", "AWS", "Security", "Visual Cryptography"],
    link: null,
  },
  {
    title: "LLM Systems @ LabOps (selected)",
    description:
      "Qwen3‑4B GPU endpoints, context‑window mgmt, and CoT‑style prompting for better interpretability.",
    tags: ["Qwen", "TensorFlow", "Kubernetes", "Cloud Run", "LLM Infra"],
    link: null,
  },
  {
    title: "Dermatology Vision Pipeline",
    description:
      "OpenCV preprocessing + ViT inference served via TensorFlow Serving with Docker image versioning.",
    tags: ["OpenCV", "ViT", "TensorFlow Serving"],
    link: null,
  },
];

const skills = [
  {
    group: "Programming",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    group: "Frameworks",
    items: ["Django", "Django REST", "FastAPI", "React"],
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "MySQL", "Redis", "Celery", "Kafka (basics)"],
    icon: <Database className="w-5 h-5" />,
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Git/GitHub"],
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    group: "ML / AI",
    items: ["TensorFlow", "scikit‑learn", "Transformers (HF)"],
    icon: <Rocket className="w-5 h-5" />,
  },
];

const achievements = [
  {
    title: "IIT Mandi Catalyst Incubation",
    body: "Incubated under IIT Mandi Catalyst program.",
  },
  {
    title: "HP Chief Minister Startup Scheme",
    body: "Incubated under the HP CM Startup Scheme.",
  },
  {
    title: "Xartup Fellowship (AWS credits $5,000)",
    body: "Selected for the Xartup fellowship with AWS credits.",
  },
];

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-200 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm">
      {children}
    </span>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">{subtitle}</p>
      )}
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function useDarkMode() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [enabled]);
  return [enabled, setEnabled];
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } }),
};

export default function App() {
  const [dark, setDark] = useDarkMode();
  const initials = useMemo(() =>
    profile.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2),
  []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/60 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold">
              {initials}
            </div>
            <div className="leading-tight">
              <div className="font-semibold">{profile.name}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">{profile.role}</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#achievements">Achievements</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={() => setDark((d) => !d)}
              className="ml-1 inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}<span className="hidden sm:inline">Theme</span>
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20" aria-hidden>
          <div className="absolute -top-32 -left-16 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-fuchsia-400/30 to-emerald-400/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-rose-400/30 via-amber-300/30 to-sky-400/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 items-center gap-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Hello, I am
            </p>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">
              {profile.name}
            </h1>
            <h2 className="mt-3 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300">
              {profile.role} · {profile.location}
            </h2>
            <p className="mt-5 max-w-3xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resumeURL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
              >
                View Resume <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4" /> {profile.email}</span>
              <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> {profile.phone}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> {profile.location}</span>
            </div>
          </motion.div>
          <div className="relative h-64 md:h-full">
            <CubeCanvas />
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          icon={<GraduationCap className="w-5 h-5" />}
          title="About"
          subtitle="Computer Science (Information Security) graduate — building production systems since 2024."
        />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              I enjoy owning problems end‑to‑end: profiling hot paths, designing data models, stitching infra,
              and making DX smoother for teammates. Recent focus areas: efficient LLM serving, retrieval & ranking,
              and image pipelines for medical use‑cases.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Jaypee University of Information Technology (B.Tech CSE, InfoSec) — 2020‑2024, CGPA 7.98/10
            </p>
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle icon={<Briefcase className="w-5 h-5" />} title="Experience" subtitle="Impact highlights from recent roles." />
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <motion.article
              key={exp.company}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={idx}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{exp.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{exp.company} • {exp.location}</p>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{exp.period}</span>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {exp.stack?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle icon={<Code2 className="w-5 h-5" />} title="Projects" subtitle="Selected public and work‑adjacent pieces." />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70 flex flex-col"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={idx}
            >
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 flex-1">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm hover:underline"
                >
                  View <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle icon={<Cpu className="w-5 h-5" />} title="Skills" subtitle="A practical toolkit I reach for often." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s, idx) => (
            <motion.div
              key={s.group}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={idx}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">{s.icon}</div>
                <h3 className="font-semibold">{s.group}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle icon={<Award className="w-5 h-5" />} title="Achievements" subtitle="Programs and recognition." />
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, idx) => (
            <motion.div
              key={a.title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={idx}
            >
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle icon={<Mail className="w-5 h-5" />} title="Contact" subtitle="Let’s build something useful together." />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
            <div className="space-y-3 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:underline">
                <Mail className="w-4 h-4" /> {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s|\u00A0/g, "")}`} className="flex items-center gap-3 hover:underline">
                <Phone className="w-4 h-4" /> {profile.phone}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                <Github className="w-4 h-4" /> github.com/mridul45
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:underline">
                <Linkedin className="w-4 h-4" /> LinkedIn Profile
              </a>
            </div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm">
              Prefer email for first contact. I’m open to backend/infra roles and LLM/ML‑adjacent backend work.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/70 dark:bg-neutral-900/70">
            <h3 className="font-semibold mb-3">Quick note</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              This portfolio is a single‑file React component. To publish, deploy this Vite app to Vercel/Netlify/GitHub Pages.
            </p>
            <ul className="mt-3 text-sm list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
              <li>Update <span className="font-mono">profile.resumeURL</span> with your hosted PDF link.</li>
              <li>Replace/add more projects with public repos or case studies.</li>
              <li>Wire a contact form to your backend (FastAPI/DRF) if needed.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-neutral-200/60 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-500 dark:text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} {profile.name}</div>
          <div className="flex items-center gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            <span>•</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-950 px-4 py-10 text-slate-200 dark:border-slate-700 sm:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute right-0 top-16 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-4">
        <section className="lg:col-span-2">
          <h3 className="text-2xl font-black">JGEC GYM BROS</h3>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Fitness tracking platform for the JGEC community. Log workouts daily, build streaks,
            and improve consistency with measurable progress.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href="https://github.com/soumik7063" label="GitHub" icon={<FaGithub />} />
            <SocialLink
              href="https://www.linkedin.com/in/soumik-ghatak-6584bb23b"
              label="LinkedIn"
              icon={<FaLinkedin />}
            />
            <SocialLink
              href="https://www.instagram.com/soumik.ghatak/"
              label="Instagram"
              icon={<FaInstagram />}
            />
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cyan-300">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <a href="#workout-dashboard" className="transition hover:text-cyan-300">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#workout-logger" className="transition hover:text-cyan-300">
                Workout Logger
              </a>
            </li>
            <li>
              <a href="#workout-statistics" className="transition hover:text-cyan-300">
                Statistics
              </a>
            </li>
            <li>
              <a href="#streak-calendar" className="transition hover:text-cyan-300">
                Streak Calendar
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-bold uppercase tracking-wide text-cyan-300">Contact</h4>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-cyan-300" />
              <span>Jalpaiguri Government Engineering College, West Bengal</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-cyan-300" />
              <span>support@gymbros.jgec.edu</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-cyan-300" />
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="relative z-10 mx-auto mt-8 flex w-full max-w-7xl flex-col gap-3 border-t border-slate-700/70 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{new Date().getFullYear()} JGEC Gym Bros. All rights reserved.</p>
        <p>
          Built by{" "}
          <a
            href="https://github.com/soumik7063"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-cyan-300 hover:underline"
          >
            Soumik Ghatak
          </a>
        </p>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-900 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-300"
  >
    {icon}
  </a>
);

export default Footer;

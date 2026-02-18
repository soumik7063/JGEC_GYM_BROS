import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const today = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const isDark = theme === "dark";
  const navClasses = isDark
    ? "border-slate-700 bg-slate-950/95 text-slate-100"
    : "border-slate-200 bg-white/95 text-slate-900";
  const subtextClasses = isDark ? "text-slate-300" : "text-slate-600";
  const chipClasses = isDark
    ? "border-slate-500/40 bg-slate-700/40 !text-slate-100"
    : "border-slate-300 bg-slate-100 !text-slate-700";
  const toggleButtonClasses = isDark
    ? "border-slate-500/40 bg-slate-700/50 hover:bg-slate-700"
    : "border-slate-300 bg-slate-100 hover:bg-slate-200";
  const accountClasses = isDark
    ? "border-slate-500/40 bg-slate-700/40"
    : "border-slate-300 bg-slate-100";
  const accountTextClasses = isDark ? "text-slate-200" : "text-slate-700";

  return (
    <nav className={`sticky top-0 z-50 border-b shadow-xl backdrop-blur ${navClasses}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-xl border border-slate-300/40 object-cover shadow-lg"
            src="./logo.png"
            alt="Gym Bros Logo"
          />
          <div className="min-w-0">
            <p className="text-lg font-extrabold tracking-wide">JGEC GYM BROS</p>
            <p className={`truncate text-xs ${subtextClasses}`}>Strength. Discipline. Consistency.</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className={`metric-chip ${chipClasses}`}>
            Campus Fitness Hub
          </span>
          <span className={`metric-chip ${chipClasses}`}>
            {today}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`rounded-xl border p-2 transition ${toggleButtonClasses}`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg className="h-5 w-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8
                  0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1
                  0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0
                  11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1
                  1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2
                  0v-1a1 1 0 011-1zM5.05 6.464A1 1 0
                  106.465 5.05l-.708-.707a1 1 0
                  00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0
                  01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1
                  1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="primary-btn px-4 py-2 text-sm">Sign in</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 ${accountClasses}`}>
              <span className={`hidden max-w-28 truncate text-sm sm:block ${accountTextClasses}`}>
                {user?.firstName || "Account"}
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import {
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setActiveView }) => {
  const { theme, toggleTheme } = useTheme();
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { manualUser, logoutManual } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isUserAuthenticated = isClerkSignedIn || !!manualUser;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const dropdownClasses = isDark
    ? "border-slate-700 bg-slate-900 shadow-2xl shadow-black/40"
    : "border-slate-200 bg-white shadow-2xl shadow-slate-200/60";
  const dropdownItemClasses = isDark
    ? "hover:bg-slate-800 text-slate-200"
    : "hover:bg-slate-100 text-slate-700";

  const displayName = manualUser?.name?.split(' ')[0] || clerkUser?.firstName || "Account";
  const avatarLetter = (manualUser?.name?.[0] || clerkUser?.firstName?.[0] || "A").toUpperCase();

  const handleLogout = () => {
    setDropdownOpen(false);
    logoutManual();
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    setActiveView?.('profile');
  };

  return (
    <nav className={`sticky top-0 z-50 border-b shadow-xl backdrop-blur ${navClasses}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 cursor-pointer rounded-xl border border-slate-300/40 object-cover shadow-lg transition hover:opacity-80"
            src="./logo.png"
            alt="Gym Bros Logo"
            onClick={() => setActiveView?.('home')}
          />
          <div
            className="min-w-0 cursor-pointer"
            onClick={() => setActiveView?.('home')}
          >
            <p className="text-lg font-extrabold tracking-wide transition hover:text-cyan-500">JGEC GYM BROS</p>
            <p className={`truncate text-xs ${subtextClasses}`}>Strength. Discipline. Consistency.</p>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-4 border-r border-slate-200 pr-6 dark:border-slate-700">
            <Link to="/" className={`text-sm font-semibold transition hover:text-indigo-500 ${location.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : subtextClasses}`}>Home</Link>
            <Link to="/community" className={`text-sm font-semibold transition hover:text-indigo-500 ${location.pathname === '/community' ? 'text-indigo-600 dark:text-indigo-400' : subtextClasses}`}>Community</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className={`metric-chip ${chipClasses}`}>
              Campus Fitness Hub
            </span>
            <span className={`metric-chip ${chipClasses}`}>
              {today}
            </span>
          </div>
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

          {!isUserAuthenticated && (
            <SignInButton mode="modal">
              <button className="primary-btn px-4 py-2 text-sm">Sign in</button>
            </SignInButton>
          )}

          {isUserAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              {/* Profile trigger button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-1.5 transition hover:opacity-80 ${accountClasses}`}
              >
                <span className={`hidden max-w-28 truncate text-sm font-semibold sm:block ${accountTextClasses}`}>
                  {displayName}
                </span>
                {clerkUser?.imageUrl ? (
                  <img
                    src={clerkUser.imageUrl}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-cyan-500/30"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white ring-2 ring-cyan-500/30">
                    {avatarLetter}
                  </div>
                )}
                {/* Chevron */}
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""} ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border backdrop-blur-lg ${dropdownClasses}`}
                  style={{ animation: "fadeSlideIn 0.15s ease-out" }}
                >
                  <button
                    onClick={handleProfile}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${dropdownItemClasses}`}
                  >
                    <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    My Profile
                  </button>
                  <div className={`mx-3 border-t ${isDark ? "border-slate-700/60" : "border-slate-200"}`} />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-500/10"
                  >
                    <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown animation keyframes */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

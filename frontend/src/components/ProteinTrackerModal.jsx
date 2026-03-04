import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";
import { createPortal } from "react-dom";

const ProteinTrackerModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { manualUser } = useAuth();
  const { user: clerkUser } = useUser();
  const userId = clerkUser?.id || manualUser?.userId;

  const [proteinAmount, setProteinAmount] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const isDark = theme === "dark";
  const modalBg = isDark
    ? "bg-slate-900 border-slate-700"
    : "bg-white border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const inputBg = isDark
    ? "bg-slate-800 border-slate-700 text-white"
    : "bg-slate-50 border-slate-300 text-slate-900";

  useEffect(() => {
    if (isOpen && userId) {
      fetchLogs();
    }
  }, [isOpen, userId]);

  const fetchLogs = async () => {
    try {
      const BASE_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${BASE_URL}/api/getprotein`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (data.success) {
        setLogs(data.proteinLogs);
      } else {
        setError(data.message || "Failed to fetch logs");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  const handleAddProtein = async (e) => {
    e.preventDefault();
    if (!proteinAmount) return;

    setLoading(true);
    setError("");

    try {
      const BASE_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${BASE_URL}/api/addprotein`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          date: selectedDate,
          protein: Number(proteinAmount),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setLogs(data.proteinLogs);
        setProteinAmount("");
      } else {
        setError(data.message || "Failed to add protein");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${modalBg}`}
      >
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 rounded-full p-1 transition hover:bg-slate-500/20 ${textSecondary}`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2
          className={`mb-6 text-2xl font-bold flex items-center gap-2 ${textPrimary}`}
        >
          <svg
            className="w-6 h-6 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          Protein Tracker
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleAddProtein} className="mb-8 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`w-full rounded-xl border p-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${inputBg}`}
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Protein Amount (g)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g. 50"
                value={proteinAmount}
                onChange={(e) => setProteinAmount(e.target.value)}
                className={`w-full rounded-xl border p-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${inputBg}`}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <h3 className={`font-semibold ${textPrimary}`}>History</h3>
          {logs.length === 0 ? (
            <p className={`text-sm ${textSecondary}`}>
              No logs found. Start tracking your protein!
            </p>
          ) : (
            <div
              className={`max-h-64 overflow-y-auto rounded-xl border p-2 ${isDark ? "border-slate-700/50" : "border-slate-200"}`}
            >
              {[...logs].reverse().map((log, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center border-b p-3 last:border-0 ${isDark ? "border-slate-700/50" : "border-slate-100"}`}
                >
                  <span className={`font-medium ${textPrimary}`}>
                    {new Date(log.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-bold text-indigo-500 px-3 py-1 bg-indigo-500/10 rounded-lg">
                    {log.protein}g
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProteinTrackerModal;

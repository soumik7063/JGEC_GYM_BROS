import React, { useContext, useMemo } from "react";
import { FaBullseye, FaFire, FaTrophy } from "react-icons/fa";
import Auth from "../auth/Auth";
import { workoutContext } from "../../context/WorkoutContext";
import {
  formatAsIsoDate,
  getWorkoutInsights,
} from "../../utils/workoutAnalytics";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateObject = (rawDate) => {
  const normalized = String(rawDate || "").replaceAll("-", "/");
  const parts = normalized.split("/");
  if (parts.length !== 3) return null;

  let year;
  let month;
  let day;
  if (parts[0].length === 4) {
    [year, month, day] = parts;
  } else {
    [day, month, year] = parts;
  }

  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

const buildMonthlyCalendar = (workoutDateSet, startMonth, endMonth) => {
  if (!startMonth || !endMonth || startMonth > endMonth) return [];

  const months = [];
  const cursor = new Date(startMonth);

  while (cursor <= endMonth) {
    const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();

    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push({ type: "empty", key: `${year}-${month}-empty-start-${i}` });
    }

    let activeDays = 0;
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateKey = formatAsIsoDate(new Date(year, month, day));
      const isActive = workoutDateSet.has(dateKey);
      if (isActive) activeDays += 1;
      cells.push({
        type: "day",
        key: dateKey,
        dateKey,
        isActive,
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ type: "empty", key: `${year}-${month}-empty-end-${cells.length}` });
    }

    months.push({
      id: `${year}-${month}`,
      label: monthStart.toLocaleString("default", { month: "long", year: "numeric" }),
      cells,
      activeDays,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return months;
};

const DailyStreak = () => {
  const { data } = useContext(workoutContext);
  const workouts = useMemo(() => data?.user?.workouts || [], [data?.user?.workouts]);
  const insights = useMemo(() => getWorkoutInsights(workouts), [workouts]);
  const parsedWorkoutDates = useMemo(
    () =>
      workouts
        .map((item) => toDateObject(item.date))
        .filter(Boolean),
    [workouts]
  );
  const workoutDateSet = useMemo(() => {
    const set = new Set();
    parsedWorkoutDates.forEach((dateObj) => {
      set.add(formatAsIsoDate(dateObj));
    });
    return set;
  }, [parsedWorkoutDates]);
  const monthlyCalendar = useMemo(() => {
    if (parsedWorkoutDates.length === 0) return [];

    const firstWorkout = new Date(
      Math.min(...parsedWorkoutDates.map((dateObj) => dateObj.getTime()))
    );
    const startMonth = new Date(firstWorkout.getFullYear(), firstWorkout.getMonth(), 1);
    const endMonth = new Date();
    endMonth.setDate(1);
    endMonth.setHours(0, 0, 0, 0);

    return buildMonthlyCalendar(workoutDateSet, startMonth, endMonth);
  }, [parsedWorkoutDates, workoutDateSet]);

  const monthLabel = new Date().toLocaleString("default", { month: "long" });

  return (
    <section id="streak-calendar" className="panel scroll-mt-24 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="section-title">Daily Streak Overview</h1>
          <p className="text-muted mt-1 text-sm">
            Calendar-based consistency tracker for your daily gym sessions.
          </p>
        </div>
        <span className="metric-chip">{monthLabel} snapshot</span>
      </div>

      <Auth />

      {workouts.length > 0 ? (
        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0">
            <StatCard
              label="Current Streak"
              value={`${insights.currentStreak}d`}
              icon={<FaFire />}
              accent="text-orange-500"
            />
            <StatCard
              label="Longest Streak"
              value={`${insights.longestStreak}d`}
              icon={<FaTrophy />}
              accent="text-amber-500"
            />
            <StatCard
              label="Total Active Days"
              value={insights.totalDays}
              icon={<FaBullseye />}
              accent="text-emerald-500"
            />
          </div>

          <div className="panel border-slate-300/40 p-4 dark:border-slate-700">
            <h2 className="text-lg font-semibold">Month-wise Streak Calendar</h2>
            <p className="text-muted mt-1 text-sm">
              Calendar view with weekday rows. Green boxes mark days where you logged workout.
            </p>
            <div className="mt-4 overflow-x-auto pb-1">
              <div className="flex w-max gap-3 pr-1">
                {monthlyCalendar.map((month) => (
                  <article
                    key={month.id}
                    className="w-[172px] shrink-0 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xs font-semibold">{month.label}</h3>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                        {month.activeDays}
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {WEEKDAY_LABELS.map((label) => (
                        <div
                          key={`${month.id}-${label}`}
                          className="text-center text-[9px] font-semibold uppercase text-slate-500 dark:text-slate-400"
                        >
                          {label}
                        </div>
                      ))}
                    </div>

                    <div className="mt-1 grid grid-cols-7 justify-items-center gap-1">
                      {month.cells.map((cell) =>
                        cell.type === "empty" ? (
                          <div key={cell.key} className="h-3 w-3 rounded-sm" />
                        ) : (
                          <div
                            key={cell.key}
                            title={cell.dateKey}
                            className={`h-3 w-3 rounded-[3px] border ${
                              cell.isActive
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-400/50 p-8 text-center">
          <h3 className="text-xl font-semibold">No streak data yet</h3>
          <p className="text-muted mt-2">
            Start logging workouts to unlock streaks, heatmap activity, and progress insights.
          </p>
        </div>
      )}
    </section>
  );
};

const StatCard = ({ label, value, icon, accent }) => (
  <article className="panel min-w-[136px] shrink-0 border-slate-300/50 p-2.5 dark:border-slate-700 md:min-w-0 md:p-4">
    <div className="flex items-center justify-between gap-2 md:items-start md:gap-4">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 md:text-xs">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-bold md:mt-1 md:text-xl">{value}</p>
      </div>
      <div className={`text-base ${accent} md:text-lg`}>{icon}</div>
    </div>
  </article>
);

export default DailyStreak;

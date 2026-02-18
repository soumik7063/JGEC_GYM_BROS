import React, { useContext, useMemo } from "react";
import { FaChartColumn, FaFire } from "react-icons/fa6";
import { workoutContext } from "../context/WorkoutContext";
import { WORKOUT_LABELS } from "../constants/workoutData";
import { getTopWorkoutGroup } from "../utils/workoutAnalytics";

const Statistics = () => {
  const { data } = useContext(workoutContext);
  const totals = useMemo(() => data?.user?.totalWorkouts || [], [data?.user?.totalWorkouts]);

  const normalized = useMemo(() => {
    const keys = Object.keys(WORKOUT_LABELS).map(Number);
    return keys.map((index) => ({
      label: WORKOUT_LABELS[index],
      value: Number(totals[index]) || 0,
    }));
  }, [totals]);

  const maxValue = useMemo(() => {
    const max = Math.max(...normalized.map((item) => item.value), 0);
    return max < 5 ? 5 : max;
  }, [normalized]);

  const topGroup = useMemo(() => getTopWorkoutGroup(totals), [totals]);
  const hasData = normalized.some((item) => item.value > 0);

  return (
    <section id="workout-statistics" className="panel scroll-mt-24 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="section-title">Workout Statistics</h2>
          <p className="text-muted mt-1 text-sm">Volume comparison across all muscle groups.</p>
        </div>
        <span className="metric-chip">
          <FaFire className="text-orange-500" />
          Most active: {topGroup.label}
        </span>
      </div>

      {hasData ? (
        <div className="space-y-4">
          {normalized.map((item, index) => {
            const width = Math.min((item.value / maxValue) * 100, 100);
            return (
              <article
                key={item.label}
                className="animate-[fadeIn_240ms_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-slate-600 dark:text-slate-300">{item.value} sessions</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{
                      width: `${width}%`,
                      transition: "width 480ms ease-out",
                      transitionDelay: `${index * 50}ms`,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-400/60 p-8 text-center">
          <FaChartColumn className="mx-auto text-xl text-slate-400" />
          <p className="text-muted mt-2">No stats yet. Log workouts to generate analytics.</p>
        </div>
      )}
    </section>
  );
};

export default Statistics;

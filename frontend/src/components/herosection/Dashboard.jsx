import { useUser } from "@clerk/clerk-react";
import React, { useContext, useMemo } from "react";
import { workoutContext } from "../../context/WorkoutContext";
import { WORKOUT_LABELS } from "../../constants/workoutData";
import { getWorkoutCards } from "../../utils/workoutAnalytics";

const Dashboard = () => {
  const { isSignedIn } = useUser();
  const { data, loading } = useContext(workoutContext);

  const workoutCards = useMemo(
    () => getWorkoutCards(data?.user?.workouts || []),
    [data?.user?.workouts]
  );

  if (!isSignedIn) {
    return (
      <section className="panel p-6 text-center">
        <p className="text-muted">Please sign in to view your workout history.</p>
      </section>
    );
  }

  return (
    <section id="workout-dashboard" className="panel scroll-mt-24 p-4 sm:p-6">
      <h2 className="section-title mb-4">Workout Dashboard</h2>

      {loading ? (
        <p className="text-muted py-8 text-center">Loading workout data...</p>
      ) : workoutCards.length > 0 ? (
        <div className="space-y-3">
          {workoutCards.map((card) => (
            <WorkoutCard
              key={card.normalizedDate}
              date={card.normalizedDate}
              exerciseIndexes={card.exercise || []}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-400/60 p-8 text-center">
          <p className="text-muted">No workouts logged yet.</p>
        </div>
      )}
    </section>
  );
};

const WorkoutCard = ({ date, exerciseIndexes }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <h3 className="mb-3 text-lg font-semibold">{date}</h3>
    <div className="flex flex-wrap gap-2">
      {exerciseIndexes.length > 0 ? (
        exerciseIndexes.map((index, idx) => (
          <span
            key={`${date}-${index}-${idx}`}
            className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-200"
          >
            {WORKOUT_LABELS[index]}
          </span>
        ))
      ) : (
        <span className="text-sm text-slate-500 dark:text-slate-400">No exercise data.</span>
      )}
    </div>
  </article>
);

export default Dashboard;

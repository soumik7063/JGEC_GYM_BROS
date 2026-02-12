import React, { useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { workoutContext } from "../../context/WorkoutContext";
import workouts from "../../context/Workouts";

const Card = ({ date, exercises }) => {
  return (
    <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6 w-full text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">📅 {date}</h3>

        <span className="text-sm text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
          {exercises?.length || 0} exercises
        </span>
      </div>

      {exercises && exercises.length > 0 ? (
        <ul className="space-y-3">
          {exercises.map((exercise, index) => (
            <li
              key={index}
              className="flex items-center bg-black/40 border border-orange-500/10 p-3 rounded-lg"
            >
              <span className="text-orange-500 mr-3">💪</span>
              <span className="text-gray-300 font-medium">
                {workouts[exercise]}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">No exercises logged.</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { isSignedIn } = useUser();
  const { data, loading } = useContext(workoutContext);

  return (
    <div className="bg-black py-16 px-4 text-white">
      {isSignedIn ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-orange-500">
            Workout Dashboard
          </h2>

          {loading && <p className="text-gray-400">Loading...</p>}

          {data?.user?.workouts?.length > 0 ? (
            data.user.workouts.map((workout, index) => (
              <Card
                key={index}
                date={workout.date}
                exercises={workout.exercise}
              />
            ))
          ) : (
            <p className="text-gray-400">No workouts logged yet.</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          Please log in to view your dashboard.
        </p>
      )}
    </div>
  );
};

export default Dashboard;

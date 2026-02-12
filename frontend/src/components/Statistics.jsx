import React, { useContext, useEffect, useState } from "react";
import { workoutContext } from "../context/WorkoutContext";
import { motion } from "framer-motion";

const exerciseNames = [
  "Shoulder",
  "Back",
  "Biceps",
  "Triceps",
  "Chest",
  "Legs",
  "Abs",
  "Cardio",
];

const maxValue = 50;

const Statistics = () => {
  const { data } = useContext(workoutContext);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (data?.user?.totalWorkouts) {
      setWorkouts(data.user.totalWorkouts);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Glass Card */}
        <div className="bg-gradient-to-br from-black/60 via-zinc-900/60 to-black/60 border border-orange-500/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Workout <span className="text-orange-500">Statistics</span>
          </motion.h2>

          {workouts && workouts.length > 0 ? (
            <div className="space-y-8">
              {workouts.map((value, index) => {
                if (!value) return null;

                const percentage = Math.min((value / maxValue) * 100, 100);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                  >
                    {/* Label Row */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-300 text-sm md:text-base">
                        {exerciseNames[index - 1]}
                      </span>

                      <span className="text-orange-400 font-bold text-sm">
                        {value} / {maxValue}
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-4 md:h-5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/30"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                        }}
                      />
                    </div>

                    {/* Percentage Text */}
                    <div className="text-right mt-1 text-xs text-gray-500">
                      {percentage.toFixed(0)}%
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.p
              className="text-center text-gray-500 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No workout data found.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;

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

const barColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-orange-400",
  "bg-pink-400",
  "bg-teal-400",
];

const Statistics = () => {
  const { data } = useContext(workoutContext);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (data?.user?.totalWorkouts) {
      setWorkouts(data.user.totalWorkouts);
    }
  }, [data]);

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <motion.h2
        className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Workout Statistics
      </motion.h2>

      {workouts && workouts.length > 0 ? (
        <div className="space-y-5">
          {workouts.map((value, index) => {
            if (value === null || value === undefined) return null;

            const percentage = Math.min((value / maxValue) * 100, 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">{exerciseNames[index-1]}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {value} / {maxValue}
                  </span>
                </div>

                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${barColors[index]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No workout data found.
        </motion.p>
      )}
    </div>
  );
};

export default Statistics;

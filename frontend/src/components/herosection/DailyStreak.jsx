import React, { useContext, useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { workoutContext } from "../../context/WorkoutContext";

const convertDate = (d) => {
  const [dd, mm, yyyy] = d.split("/");
  return `${yyyy}/${mm.padStart(2, "0")}/${dd.padStart(2, "0")}`;
};

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Train insane or remain the same.",
  "Strive for progress, not perfection.",
  "The pain you feel today will be the strength you feel tomorrow.",
];

const DailyStreak = () => {
  const { data } = useContext(workoutContext);
  const [dates, setDates] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const quote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setRandomQuote(quote);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (data?.user?.workouts) {
      const formatted = data.user.workouts.map((workout) => ({
        date: convertDate(workout.date),
        count: 1,
      }));
      setDates(formatted);
    }
  }, [data]);

  const totalWorkouts = dates.length;
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="min-h-screen bg-black py-16 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Your <span className="text-orange-500">Daily Streak</span>
          </h1>
          <p className="text-gray-400 mt-4">Consistency builds champions.</p>
        </div>

        {dates.length > 0 ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md rounded-xl p-6">
                <p className="text-gray-400 text-sm">Total Workouts</p>
                <p className="text-3xl font-bold text-orange-500 mt-2">
                  {totalWorkouts}
                </p>
              </div>

              <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md rounded-xl p-6">
                <p className="text-gray-400 text-sm">Current Month</p>
                <p className="text-3xl font-bold text-orange-500 mt-2">
                  {currentMonth}
                </p>
              </div>

              <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md rounded-xl p-6">
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-xl font-bold text-orange-500 mt-2">
                  On Fire 🔥
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-linear-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-10 shadow-xl">
              <p className="text-xl italic text-white text-center">
                "{randomQuote}"
              </p>
            </div>

            {/* Heatmap */}
            <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md rounded-xl p-6 overflow-x-auto">
              <h2 className="text-xl font-bold text-orange-500 mb-6">
                Activity Calendar
              </h2>

              <div className="flex justify-center">
                <HeatMap
                  value={dates}
                  width={window.innerWidth < 768 ? 320 : 800}
                  style={{
                    "--rhm-rect": "#1f2937",
                  }}
                  rectProps={{ rx: 4 }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-black/60 border border-orange-500/20 backdrop-blur-md rounded-xl p-10 text-center">
            <p className="text-gray-400">
              Start logging workouts to build your streak 🔥
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyStreak;

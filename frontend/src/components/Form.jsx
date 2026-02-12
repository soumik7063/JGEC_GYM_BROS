import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { workoutContext } from "../context/WorkoutContext";

const workoutOptionsToindex = {
  "Shoulder Press": 1,
  Back: 2,
  Biceps: 3,
  Triceps: 4,
  Chest: 5,
  Legs: 6,
  Abs: 7,
  Cardio: 8,
};

const options = [
  "Shoulder Press",
  "Back",
  "Biceps",
  "Triceps",
  "Chest",
  "Legs",
  "Abs",
  "Cardio",
];

const workoutEmojis = {
  "Shoulder Press": "🏋️‍♂️",
  Back: "🔙",
  Biceps: "💪",
  Triceps: "🦾",
  Chest: "🫁",
  Legs: "🦵",
  Abs: "🔥",
  Cardio: "❤️",
};

const date = new Date();

export default function CheckboxForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { handelWorkout, loading } = useContext(workoutContext);

  const selected = watch("selectedOptions") || [];

  const toggleOption = (opt) => {
    if (selected.includes(opt)) {
      setValue(
        "selectedOptions",
        selected.filter((item) => item !== opt),
      );
    } else {
      setValue("selectedOptions", [...selected, opt]);
    }
  };

  const onSubmit = (data) => {
    if (data.selectedOptions?.length > 0) {
      const selectedIndexes = data.selectedOptions.map(
        (opt) => workoutOptionsToindex[opt],
      );

      handelWorkout({
        date: date.toLocaleDateString(),
        exercises: selectedIndexes,
      });
    }
  };

  const progress = (selected.length / options.length) * 100;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-16 text-white">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-black/60 via-zinc-900/60 to-black/60 border border-orange-500/20 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Build Your <span className="text-orange-500">Workout</span>
            </h2>

            <p className="text-gray-400 mt-3">{date.toLocaleDateString()}</p>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              {selected.length} / {options.length} selected
            </p>
          </div>

          {/* Workout Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {options.map((opt, index) => {
              const isSelected = selected.includes(opt);

              return (
                <div
                  key={index}
                  onClick={() => toggleOption(opt)}
                  className={`cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 border ${
                    isSelected
                      ? "bg-orange-500 text-black border-orange-500 scale-105 shadow-lg shadow-orange-500/30"
                      : "bg-zinc-900 border-zinc-700 hover:border-orange-400 hover:scale-105"
                  }`}
                >
                  <div className="text-4xl mb-3">{workoutEmojis[opt]}</div>

                  <p className="font-semibold text-lg">{opt}</p>
                </div>
              );
            })}
          </div>

          {/* Hidden Checkboxes for Form */}
          {options.map((opt, i) => (
            <input
              key={i}
              type="checkbox"
              value={opt}
              {...register("selectedOptions", {
                validate: (value) =>
                  (value && value.length > 0) || "Select at least one workout",
              })}
              className="hidden"
            />
          ))}

          {/* Error */}
          {errors.selectedOptions && (
            <p className="text-red-400 text-center mb-6">
              {errors.selectedOptions.message}
            </p>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className={`px-10 py-4 rounded-2xl cursor-pointer text-lg font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 hover:scale-105 shadow-xl shadow-orange-500/30"
              } text-black`}
            >
              {loading ? "Submitting..." : "🔥 Save Workout"}
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center mt-8 text-gray-500">
          Discipline {`>`} Motivation
        </p>
      </div>
    </div>
  );
}

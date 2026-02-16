import React from "react";
import { useForm } from "react-hook-form";
import { workoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

const workoutOptionsToindex ={
    "Shoulder Press":1,
    "Back":2,
    "Biceps":3,
    "Triceps":4,
    "Chest":5,
    "Legs":6,
    "Abs":7,
    "Cardio":8
}

const options = ["Shoulder Press", "Back", "Biceps", "Triceps", "Chest", "Legs", "Abs", "Cardio"];
const date = new Date();

const workoutEmojis = {
    "Shoulder Press": "🏋️‍♂️",
    "Back": "🔙",
    "Biceps": "💪",
    "Triceps": "🦾",
    "Chest": "🫁",
    "Legs": "🦵",
    "Abs": "🔥",
    "Cardio": "❤️"
};

export default function CheckboxForm() {
    const [selectedOptions, setSelectedOptions] = React.useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {handelWorkout,loading} = useContext(workoutContext);
  
  const onSubmit = (data) => {
    if(data.selectedOptions.length>0){
        const selectedIndexes = data.selectedOptions.map(opt=>workoutOptionsToindex[opt]);
        setSelectedOptions(selectedIndexes);
        handelWorkout({
            date: date.toLocaleDateString(),
            exercises: selectedIndexes
        });
    }else{
        console.log("No options selected");
    }
  };

  const watchedOptions = watch("selectedOptions") || [];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700"
        >
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🏋️‍♂️</div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mb-2">
              Log Your Workout
            </h2>
            <div className="flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full inline-block">
              <span className="text-blue-600 dark:text-blue-400">📅</span>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {date.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Selected Count Badge */}
          {watchedOptions.length > 0 && (
            <div className="mb-4 text-center">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block animate-pulse">
                ✓ {watchedOptions.length} exercise{watchedOptions.length !== 1 ? 's' : ''} selected
              </span>
            </div>
          )}

          {/* Checkbox Options */}
          <div className="space-y-3 mb-6">
            {options.map((opt, index) => (
              <label
                key={index}
                className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                  watchedOptions.includes(opt)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <input
                  type="checkbox"
                  value={opt}
                  {...register("selectedOptions", {
                    validate: (value) =>
                      value && value.length > 0 || "Select at least 1 option",
                  })}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 mr-3"
                />
                <span className="text-2xl mr-3">{workoutEmojis[opt]}</span>
                <span className={`text-lg font-medium ${
                  watchedOptions.includes(opt) ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'
                }`}>
                  {opt}
                </span>
              </label>
            ))}
          </div>

          {/* Error Message */}
          {errors.selectedOptions && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.selectedOptions.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            } text-white`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Submit Workout
              </span>
            )}
          </button>
        </div>

        {/* Bottom Tip */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💡 <span className="font-medium">Pro tip:</span> Consistency is key to progress!
          </p>
        </div>
      </div>
    </div>
  );
}
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaListCheck, FaWandSparkles } from "react-icons/fa6";
import { workoutContext } from "../context/WorkoutContext";
import {
  OPTION_TO_INDEX,
  PRESET_GROUPS,
  WORKOUT_ICONS,
  WORKOUT_OPTIONS,
} from "../constants/workoutData";
import { formatAsIsoDate } from "../utils/workoutAnalytics";

const Form = () => {
  const { loading, handelWorkout } = useContext(workoutContext);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedOptions: [],
    },
  });

  const watchedOptions = watch("selectedOptions") || [];
  const today = formatAsIsoDate(new Date());

  const applySelection = (items) => {
    const unique = Array.from(new Set(items));
    setValue("selectedOptions", unique, { shouldValidate: true });
    clearErrors("selectedOptions");
  };

  const onSubmit = (formValues) => {
    const selected = formValues.selectedOptions || [];
    if (selected.length === 0) {
      setError("selectedOptions", {
        type: "manual",
        message: "Select at least one workout group.",
      });
      return;
    }

    const selectedIndexes = selected
      .map((name) => OPTION_TO_INDEX[name])
      .filter(Boolean);

    handelWorkout({
      date: today,
      exercises: selectedIndexes,
    });
  };

  return (
    <section id="workout-logger" className="panel scroll-mt-24 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="section-title">Log Your Workout</h2>
          <p className="text-muted mt-1 text-sm">
            Save today&apos;s training and keep your streak consistent.
          </p>
        </div>
        <span className="metric-chip">{today}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(PRESET_GROUPS).map((groupName) => (
          <button
            key={groupName}
            type="button"
            onClick={() => applySelection(PRESET_GROUPS[groupName])}
            className="rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-500/40 dark:bg-cyan-500/20 dark:text-cyan-200"
          >
            <FaWandSparkles className="mr-1 inline-block" />
            {groupName} preset
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => applySelection(WORKOUT_OPTIONS)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={() => applySelection([])}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Clear
          </button>
        </div>
        <span className="metric-chip">
          <FaListCheck />
          {watchedOptions.length} selected
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WORKOUT_OPTIONS.map((optionName) => {
            const selected = watchedOptions.includes(optionName);
            return (
              <label
                key={optionName}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  selected
                    ? "border-cyan-500 bg-cyan-50 shadow-sm dark:bg-cyan-500/15"
                    : "border-slate-300 bg-white hover:border-cyan-300 dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                <input
                  type="checkbox"
                  value={optionName}
                  {...register("selectedOptions", {
                    onChange: () => clearErrors("selectedOptions"),
                  })}
                  className="h-4 w-4 accent-cyan-600"
                />
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                  {WORKOUT_ICONS[optionName]}
                </span>
                <span className="text-sm font-medium">{optionName}</span>
              </label>
            );
          })}
        </div>

        {errors.selectedOptions && (
          <p className="mt-3 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-600/50 dark:bg-rose-900/30 dark:text-rose-200">
            {errors.selectedOptions.message}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-sm">
            Tip: Logging daily, even short sessions, improves streak consistency.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="primary-btn px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving workout..." : "Save workout"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

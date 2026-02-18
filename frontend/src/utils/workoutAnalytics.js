import { WORKOUT_LABELS } from "../constants/workoutData";

const normalizeDate = (rawDate) => {
  if (!rawDate || typeof rawDate !== "string") return null;

  const normalized = rawDate.replaceAll("-", "/");
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

  const parsed = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    0,
    0,
    0,
    0
  );

  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

export const formatAsIsoDate = (dateObject) => {
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const buildHeatmapValues = (workouts = []) =>
  workouts
    .map((workout) => normalizeDate(workout.date))
    .filter(Boolean)
    .map((dateValue) => ({
      date: formatAsIsoDate(dateValue),
      count: 10,
    }));

export const getWorkoutInsights = (workouts = []) => {
  const uniqueDates = Array.from(
    new Set(
      workouts
        .map((item) => normalizeDate(item.date))
        .filter(Boolean)
        .map((dateValue) => formatAsIsoDate(dateValue))
    )
  ).sort();

  const dateObjects = uniqueDates.map((dateText) => normalizeDate(dateText));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentStreak = 0;
  if (dateObjects.length > 0) {
    const lastEntry = dateObjects[dateObjects.length - 1];
    const diffFromToday =
      (today.getTime() - lastEntry.getTime()) / (1000 * 60 * 60 * 24);

    if (diffFromToday === 0 || diffFromToday === 1) {
      currentStreak = 1;
      for (let i = dateObjects.length - 2; i >= 0; i -= 1) {
        const diff =
          (dateObjects[i + 1].getTime() - dateObjects[i].getTime()) /
          (1000 * 60 * 60 * 24);
        if (diff === 1) currentStreak += 1;
        else break;
      }
    }
  }

  let longestStreak = 0;
  let running = 0;
  for (let i = 0; i < dateObjects.length; i += 1) {
    if (i === 0) {
      running = 1;
    } else {
      const diff =
        (dateObjects[i].getTime() - dateObjects[i - 1].getTime()) /
        (1000 * 60 * 60 * 24);
      running = diff === 1 ? running + 1 : 1;
    }
    if (running > longestStreak) longestStreak = running;
  }

  const thisWeekCount = dateObjects.filter((dateValue) => {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);
    return dateValue >= weekAgo && dateValue <= today;
  }).length;

  const thisMonthCount = dateObjects.filter(
    (dateValue) =>
      dateValue.getMonth() === today.getMonth() &&
      dateValue.getFullYear() === today.getFullYear()
  ).length;

  return {
    totalDays: uniqueDates.length,
    currentStreak,
    longestStreak,
    thisWeekCount,
    thisMonthCount,
  };
};

export const getTopWorkoutGroup = (totalWorkouts = []) => {
  if (!Array.isArray(totalWorkouts) || totalWorkouts.length === 0) {
    return { label: "N/A", value: 0 };
  }

  let maxValue = 0;
  let maxIndex = 0;

  totalWorkouts.forEach((value, index) => {
    const safeValue = Number(value) || 0;
    if (safeValue > maxValue) {
      maxValue = safeValue;
      maxIndex = index;
    }
  });

  return {
    label: WORKOUT_LABELS[maxIndex] || "N/A",
    value: maxValue,
  };
};

export const getWorkoutCards = (workouts = []) =>
  (Array.isArray(workouts) ? workouts : [])
    .map((item) => {
      const parsedDate = normalizeDate(item.date);
      return {
        ...item,
        parsedDate,
        normalizedDate: parsedDate ? formatAsIsoDate(parsedDate) : item.date,
      };
    })
    .filter((item) => item.parsedDate)
    .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime());

export const WORKOUT_LABELS = {
  1: "Shoulder Press",
  2: "Back",
  3: "Biceps",
  4: "Triceps",
  5: "Chest",
  6: "Legs",
  7: "Abs",
  8: "Cardio",
};

export const WORKOUT_OPTIONS = Object.values(WORKOUT_LABELS);

export const OPTION_TO_INDEX = Object.entries(WORKOUT_LABELS).reduce(
  (acc, [key, value]) => {
    acc[value] = Number(key);
    return acc;
  },
  {}
);

export const WORKOUT_ICONS = {
  "Shoulder Press": "SP",
  Back: "BK",
  Biceps: "BI",
  Triceps: "TR",
  Chest: "CH",
  Legs: "LG",
  Abs: "AB",
  Cardio: "CR",
};

export const PRESET_GROUPS = {
  Push: ["Shoulder Press", "Chest", "Triceps"],
  Pull: ["Back", "Biceps"],
  Legs: ["Legs", "Cardio"],
  Core: ["Abs", "Cardio"],
};

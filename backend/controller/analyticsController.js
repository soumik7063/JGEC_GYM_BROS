import { User } from "../models/model.js";

const analyticsController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const workouts = user.workouts || [];
    const totalWorkouts = user.totalWorkouts || [];

    // Calculate total workout sessions
    const totalSessions = workouts.length;

    // Calculate most performed exercise
    const exerciseNames = ["Shoulder", "Back", "Biceps", "Triceps", "Chest", "Legs", "Abs", "Cardio"];
    let mostPerformed = { name: "None", count: 0, index: -1 };

    totalWorkouts.forEach((count, index) => {
      if (count && count > mostPerformed.count) {
        mostPerformed = {
          name: exerciseNames[index - 1] || "Unknown",
          count: count,
          index: index
        };
      }
    });

    // Calculate streaks
    const streaks = calculateStreaks(workouts);

    // Calculate weekly data (last 4 weeks)
    const weeklyData = calculateWeeklyData(workouts);

    // Calculate monthly data (last 6 months)
    const monthlyData = calculateMonthlyData(workouts);

    // Calculate exercise distribution
    const exerciseDistribution = totalWorkouts
      .map((count, index) => ({
        name: exerciseNames[index - 1] || "Unknown",
        value: count || 0
      }))
      .filter((item, index) => index > 0 && item.value > 0); // Skip index 0 and zero values

    const stats = {
      totalWorkouts: totalSessions,
      mostPerformed,
      currentStreak: streaks.current,
      longestStreak: streaks.longest,
      weeklyData,
      monthlyData,
      exerciseDistribution
    };

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Helper function to calculate streaks
function calculateStreaks(workouts) {
  if (!workouts || workouts.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort workouts by date
  const sortedDates = workouts
    .map(w => new Date(w.date))
    .sort((a, b) => b - a); // Most recent first

  // Remove duplicates (same day workouts)
  const uniqueDates = [...new Set(sortedDates.map(d => d.toDateString()))].map(d => new Date(d));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Calculate current streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = new Date(uniqueDates[0]);
  mostRecent.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));

  // Current streak only counts if last workout was today or yesterday
  if (daysDiff <= 1) {
    currentStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const current = new Date(uniqueDates[i]);
      const previous = new Date(uniqueDates[i - 1]);
      current.setHours(0, 0, 0, 0);
      previous.setHours(0, 0, 0, 0);

      const diff = Math.floor((previous - current) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i]);
    const previous = new Date(uniqueDates[i - 1]);
    current.setHours(0, 0, 0, 0);
    previous.setHours(0, 0, 0, 0);

    const diff = Math.floor((previous - current) / (1000 * 60 * 60 * 24));

    if (diff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
}

// Helper function to calculate weekly data
function calculateWeeklyData(workouts) {
  const weekCounts = {};
  const today = new Date();

  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    const weeksDiff = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24 * 7));

    if (weeksDiff < 4) {
      const weekLabel = weeksDiff === 0 ? "This Week" :
        weeksDiff === 1 ? "Last Week" :
          `${weeksDiff + 1} Weeks Ago`;
      weekCounts[weekLabel] = (weekCounts[weekLabel] || 0) + 1;
    }
  });

  // Ensure all 4 weeks are present
  const weeks = ["This Week", "Last Week", "2 Weeks Ago", "3 Weeks Ago"];
  return weeks.reverse().map(week => ({
    week,
    count: weekCounts[week] || 0
  }));
}

// Helper function to calculate monthly data
function calculateMonthlyData(workouts) {
  const monthCounts = {};
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  workouts.forEach(workout => {
    const workoutDate = new Date(workout.date);
    const monthKey = `${workoutDate.getFullYear()}-${String(workoutDate.getMonth() + 1).padStart(2, '0')}`;
    monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
  });

  // Get last 6 months
  const result = [];
  const today = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    result.push({
      month: monthNames[date.getMonth()],
      count: monthCounts[monthKey] || 0
    });
  }

  return result;
}

export default analyticsController;

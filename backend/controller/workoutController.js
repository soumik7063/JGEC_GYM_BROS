import { User } from "../models/model.js";
import { Post } from "../models/postModel.js";
import { WORKOUT_LABELS } from "../utils/constants.js";

const workoutController = async (req, res) => {
  const { userId, date, exercises, userName, userImage } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }
  if (!exercises) {
    return res.status(400).json({ success: false, message: "Exercises are required" });
  }
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  try {
    exercises.forEach(index => {
      const idx = Number(index);
      user.totalWorkouts[idx] = (user.totalWorkouts[idx] || 0) + 1;
    });
    const existingWorkoutIndex = user.workouts.findIndex(workout => workout.date === date);
    if (existingWorkoutIndex !== -1) {
      user.workouts[existingWorkoutIndex].exercise.forEach(index => {
        const idx = Number(index);
        user.totalWorkouts[idx] = (user.totalWorkouts[idx] || 0) - 1;
      });
      user.workouts[existingWorkoutIndex].exercise = exercises;
    }
    else {
      user.workouts.push({ date, exercise: exercises });
      
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (user.lastWorkoutDate === yesterday) {
          user.streak += 1;
      } else if (user.lastWorkoutDate !== today) {
          user.streak = 1;
      }
      user.lastWorkoutDate = today;
    }

    // --- Social Post Logic (Upsert) ---
    try {
        const muscleGroups = exercises.map(id => WORKOUT_LABELS[id]).join(', ');
        const postData = {
            userId,
            userName: userName || user.name || "Gym Bro",
            userImage: userImage || "",
            content: `Just crushed a ${muscleGroups} workout! 🔥`,
            type: 'workout',
            date,
            workoutData: { muscleGroups, count: exercises.length }
        };

        // If post exists for this user on this date, update it. Otherwise create new.
        const updatedPost = await Post.findOneAndUpdate(
            { userId, date, type: 'workout' },
            postData,
            { upsert: true, new: true }
        );
        
        // Emit socket event
        const io = req.app.get('io');
        if (io) {
            io.emit('new_post', updatedPost);
            console.log("Socket: Emitted new_post event for", userId);
        }
    } catch (postErr) {
        console.error("Failed to create/update social post:", postErr);
    }

    // Recalculate score (rough estimation until cron update)
    const streak = user.streak || 0;
    const totalWorkouts = user.workouts.length || 0;
    const variety = new Set(user.workouts.flatMap(w => w.exercise)).size || 0;
    user.consistencyScore = (streak * 10) + (totalWorkouts * 5) + (variety * 2);

    user.markModified('totalWorkouts');
    await user.save();
    return res.status(200).json({ success: true, message: "Workout added successfully", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




export default workoutController;
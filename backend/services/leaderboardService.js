import { User } from "../models/model.js";

const calculateConsistencyScore = (user) => {
    const streak = user.streak || 0;
    const totalWorkouts = user.workouts.length || 0;
    const variety = new Set(user.workouts.flatMap(w => w.exercise)).size || 0;

    return (streak * 10) + (totalWorkouts * 5) + (variety * 2);
};

const updateLeaderboard = async () => {
    try {
        const users = await User.find({});
        
        // 1. Calculate scores
        for (let user of users) {
             // Reset streak if last workout was more than 1 day ago
             if (user.lastWorkoutDate) {
                 const today = new Date().toISOString().split('T')[0];
                 const lastWorkout = new Date(user.lastWorkoutDate);
                 const diffTime = Math.abs(new Date(today) - lastWorkout);
                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                 
                 if (diffDays > 1) {
                     user.streak = 0;
                 }
             }

            user.consistencyScore = calculateConsistencyScore(user);
        }

        // 2. Sort users by score
        users.sort((a, b) => b.consistencyScore - a.consistencyScore);

        // 3. Assign ranks based on percentiles
        const totalUsers = users.length;
        users.forEach((user, index) => {
            const percentile = (index / totalUsers) * 100;
            if (percentile <= 3) user.rank = 'Diamond';
            else if (percentile <= 10) user.rank = 'Platinum';
            else if (percentile <= 30) user.rank = 'Gold';
            else if (percentile <= 60) user.rank = 'Silver';
            else user.rank = 'Bronze';
        });

        // 4. Save updates
        for (let user of users) {
            await user.save();
        }

        console.log("Leaderboard updated successfully");
    } catch (error) {
        console.error("Error updating leaderboard:", error);
    }
};

export { updateLeaderboard, calculateConsistencyScore };

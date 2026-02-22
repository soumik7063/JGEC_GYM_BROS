import mongoose from "mongoose";
const Workout = mongoose.Schema({
    date: {
        type: String,
    },
    exercise: {
        type: [Number],
    }
})

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    workouts: [
        Workout
    ],
    totalWorkouts: {
        type: [Number],
    },
    weightLogs: [{
        date: {
            type: String,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            default: 'kg'
        }
    }],
    time: {
        type: String,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export { User };
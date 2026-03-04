import mongoose from "mongoose";
const Workout = new mongoose.Schema({
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
        unique: true,
        sparse: true, // Allow multiple nulls if we don't use userId for manual users
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    workouts: {
        type: [Workout],
        default: []
    },
    totalWorkouts: {
        type: [Number],
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0] // Pre-initialize for 1-8 indices
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
    customTemplates: [{
        name: { type: String, required: true },
        exercises: { type: [String], required: true }
    }],
    proteinLogs: [{
        date: { type: String, required: true },
        protein: { type: Number, required: true }
    }],
    time: {
        type: String,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export { User };
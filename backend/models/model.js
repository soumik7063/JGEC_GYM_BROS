import mongoose from "mongoose";

const Workout = new mongoose.Schema({
    date: {
        type: String,
    },
    exercise: {
        type: [Number],
    }
});

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        sparse: true,
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
        default: [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        name: { 
            type: String, 
            required: true 
        },

        exercises: { 
            type: [String], 
            required: true 
        }
    }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };
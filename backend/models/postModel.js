import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String
    },
    type: {
        type: String,
        enum: ['workout', 'achievement'],
        default: 'workout'
    },
    date: {
        type: String, // YYYY-MM-DD
        index: true
    },
    content: {

        type: String,
        required: true
    },
    workoutData: {
        type: Object // Optional: store specific workout details (exercises, calories, etc.)
    },
    fistBumps: [{
        type: String // Array of userIds who gave a fist bump
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Post = mongoose.model('Post', postSchema);

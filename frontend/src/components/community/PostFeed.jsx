import React from 'react';
import PostCard from './PostCard';

const mockPosts = [
    {
        id: 1,
        author: "Alex Johnson",
        timeAgo: "2 hours ago",
        content: "Just hit a new PR on deadlifts! 405lbs for 3 reps feeling solid. Consistency really does pay off. 🙌",
        likes: 24,
        comments: 5
    },
    {
        id: 2,
        author: "Sarah Smith",
        timeAgo: "5 hours ago",
        content: "Morning run done. 5k under 25 minutes. The new campus track is amazing! 🏃‍♀️💨",
        likes: 42,
        comments: 8
    },
    {
        id: 3,
        author: "Mike Tyson",
        timeAgo: "1 day ago",
        content: "Leg day destroyed me. Does anyone have good recovery tips? Currently ice bathing.",
        likes: 15,
        comments: 12
    }
];

const PostFeed = () => {
    return (
        <div className="flex flex-col gap-6">
            {mockPosts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostFeed;

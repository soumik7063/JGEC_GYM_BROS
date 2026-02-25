import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useUser } from "@clerk/clerk-react";

const CreatePost = () => {
    const [content, setContent] = useState('');
    const { manualUser } = useAuth();
    const { user: clerkUser } = useUser();

    const userName = clerkUser?.firstName || manualUser?.name?.split(' ')[0] || "User";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        // Static for now
        setContent('');
        alert("Post created successfully! (Static placeholder)");
    };

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">
                    {userName[0]?.toUpperCase() || 'U'}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    Share your workout, {userName}!
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What did you train today? Share your progress..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    rows="3"
                />
                <div className="mt-3 flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Add Image
                    </button>
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;

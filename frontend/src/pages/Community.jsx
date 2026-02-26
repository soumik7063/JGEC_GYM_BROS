import React from 'react';
import CreatePost from '../components/community/CreatePost';
import PostFeed from '../components/community/PostFeed';

const Community = () => {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Community</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">See what others are doing. Stay motivated.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Feed Column */}
                <div className="space-y-6 lg:col-span-2">
                    <CreatePost />
                    <PostFeed />
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Trending Workouts</h3>
                        <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center justify-between">
                                <span>#LegDay</span>
                                <span className="font-medium text-indigo-500">120 posts</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>#MorningRun</span>
                                <span className="font-medium text-indigo-500">85 posts</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span>#DeadliftPR</span>
                                <span className="font-medium text-indigo-500">42 posts</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Community;

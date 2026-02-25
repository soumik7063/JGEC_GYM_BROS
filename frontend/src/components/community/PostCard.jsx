import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {post.avatar ? (
                        <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full object-cover shadow-sm" />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-lg font-bold text-white dark:bg-slate-700">
                            {post.author[0]}
                        </div>
                    )}
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{post.author}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{post.timeAgo}</p>
                    </div>
                </div>
                <button className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">{post.content}</p>
                {post.image && (
                    <img src={post.image} alt="Post content" className="mt-3 max-h-96 w-full rounded-xl object-cover shadow-sm" />
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likes}
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.comments}
                </button>
            </div>
        </div>
    );
};

export default PostCard;

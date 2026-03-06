import React from 'react';
import { motion } from 'framer-motion';
import { FaHandRock, FaRegHandRock } from 'react-icons/fa';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '@clerk/clerk-react';
import { useTheme } from '../../context/ThemeContext';

const WorkoutPost = ({ post }) => {
    const { toggleFistBump } = useSocket();
    const { manualUser } = useAuth();
    const { user: clerkUser } = useUser();
    const userId = clerkUser?.id || manualUser?.userId;
    const { theme } = useTheme();
    
    const isDark = theme === 'dark';
    const isLiked = post.fistBumps.includes(userId);

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`p-6 rounded-3xl border transition-all duration-300 ${
                isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    isDark ? 'bg-purple-900/40 text-purple-400' : 'bg-purple-100 text-purple-600'
                }`}>
                    {post.userName.substring(0, 1).toUpperCase()}
                </div>
                <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.userName}</h4>
                    <span className="text-gray-500 text-xs uppercase tracking-widest">{getTimeAgo(post.createdAt)}</span>
                </div>
            </div>

            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                {post.content}
            </p>

            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-gray-800' : 'border-slate-100'}`}>
                <button
                    onClick={() => toggleFistBump(post._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                        isLiked 
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                            : (isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-400 hover:bg-slate-50')
                    }`}
                >
                    {isLiked ? <FaHandRock className="animate-bounce" /> : <FaRegHandRock />}
                    <span>{post.fistBumps.length} FIST BUMPS</span>
                </button>

                {post.type === 'workout' && (
                    <div className={`px-3 py-1 rounded-lg text-xs font-black tracking-widest ${
                        isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'
                    }`}>
                        WORKOUT LOGGED
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default WorkoutPost;

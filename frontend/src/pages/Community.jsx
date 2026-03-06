import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import WorkoutPost from '../components/Social/WorkoutPost';
import ActiveSidebar from '../components/Social/ActiveSidebar';
import { useTheme } from '../context/ThemeContext';
import { FaUserFriends, FaGlobeAmericas, FaBolt } from 'react-icons/fa';

const Community = () => {
    const { posts, loading } = useSocket();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    if (loading) return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className={`w-12 h-12 border-4 border-t-purple-500 rounded-full ${isDark ? 'border-gray-800' : 'border-slate-200'}`}
            />
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 p-6 pt-24 pb-20 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Content: Social Wall */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <header className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-500/20">
                                <FaGlobeAmericas className="text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight">COMMUNITY WALL</h1>
                                <p className={`text-sm tracking-widest font-bold ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                    REAL-TIME UPDATES FROM THE GYM
                                </p>
                            </div>
                        </motion.div>
                    </header>

                    <div className="flex flex-col gap-6">
                        <AnimatePresence mode="popLayout">
                            {posts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`p-12 rounded-3xl border-2 border-dashed text-center ${
                                        isDark ? 'border-gray-800 text-gray-600' : 'border-slate-200 text-slate-400'
                                    }`}
                                >
                                    <FaBolt className="text-4xl mx-auto mb-4 opacity-20" />
                                    <p className="font-bold uppercase tracking-widest">No activity yet. Be the first to log a workout!</p>
                                </motion.div>
                            ) : (
                                posts.map((post) => (
                                    <WorkoutPost key={post._id} post={post} />
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Sidebar: Active Now & Info */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <ActiveSidebar />

                    {/* Stats/Tips Card */}
                    <div className={`p-6 rounded-3xl border transition-all duration-300 ${
                        isDark ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-100 shadow-sm'
                    }`}>
                        <h4 className={`font-black mb-3 flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                            <FaUserFriends /> DID YOU KNOW?
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                            Giving a "Fist Bump" boosts morale! Users who interact with the community are 40% more likely to keep their streak.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Community;

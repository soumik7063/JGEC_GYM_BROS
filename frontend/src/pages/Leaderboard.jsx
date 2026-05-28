import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal, FaCrown, FaStar, FaFire } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

const TierBadge = ({ rank }) => {
  const tiers = {
    Diamond: { color: 'text-blue-400', icon: <FaCrown />, bg: 'bg-blue-900/20', border: 'border-blue-500/50' },
    Platinum: { color: 'text-cyan-300', icon: <FaStar />, bg: 'bg-cyan-900/20', border: 'border-cyan-500/50' },
    Gold: { color: 'text-yellow-400', icon: <FaMedal />, bg: 'bg-yellow-900/20', border: 'border-yellow-500/50' },
    Silver: { color: 'text-gray-400', icon: <FaMedal />, bg: 'bg-gray-700/20', border: 'border-gray-500/50' },
    Bronze: { color: 'text-orange-400', icon: <FaMedal />, bg: 'bg-orange-900/20', border: 'border-orange-500/50' },
  };

  const tier = tiers[rank] || tiers.Bronze;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${tier.bg} ${tier.border} ${tier.color} font-bold text-sm shadow-lg shadow-${tier.color.split('-')[1]}-500/10`}>
      {tier.icon}
      <span>{rank}</span>
    </div>
  );
};

const Leaderboard = () => {
    const { theme } = useTheme();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    const isDark = theme === 'dark';

    const fetchLeaderboard = async () => {
        try {
            const response = await axios.get(`${API_URL}/leaderboard`);
            if (response.data.success) {
                setLeaderboard(response.data.leaderboard);
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            await axios.post(`${API_URL}/leaderboard/update`);
            await fetchLeaderboard();
        } catch (error) {
            console.error("Error syncing rankings:", error);
        } finally {
            setIsSyncing(false);
        }
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

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
            <header className="max-w-4xl mx-auto text-center mb-12">
                <motion.h1 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4"
                >
                    HALL OF FAME
                </motion.h1>
                <motion.p 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-slate-500 font-medium'}`}
                >
                    Compete on consistency, not just raw weight.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSync}
                    disabled={isSyncing}
                    className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${
                        isSyncing ? 'bg-gray-800 text-gray-500' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                    }`}
                >
                    <motion.div
                        animate={isSyncing ? { rotate: 360 } : {}}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                        <FaFire />
                    </motion.div>
                    {isSyncing ? 'SYNCING...' : 'SYNC RANKINGS'}
                </motion.button>
            </header>


            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto flex flex-col gap-4"
            >
                {leaderboard.map((user, index) => (
                    <motion.div
                        key={user._id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                            isDark 
                                ? `${index < 3 ? 'border-purple-500/30' : 'border-gray-800'} bg-gray-900/40 backdrop-blur-md` 
                                : `${index < 3 ? 'border-purple-400/50' : 'border-slate-200'} bg-white shadow-sm hover:shadow-md`
                        }`}
                    >
                        {index < 3 && (
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                        )}
                        
                        <div className="flex items-center gap-6 text-left">
                            <span className={`text-2xl font-black w-8 ${index < 3 ? 'text-purple-500' : (isDark ? 'text-gray-700' : 'text-slate-300')}`}>
                                #{index + 1}
                            </span>
                            
                            <div className="flex flex-col">
                                <span className={`text-xl font-bold uppercase tracking-wider transition-colors ${isDark ? 'group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-600'}`}>
                                    {user.name}
                                </span>
                                <div className="flex items-center gap-3 mt-1">
                                    <TierBadge rank={user.rank} />
                                    {user.streak > 1 && (
                                        <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">
                                            <FaFire />
                                            <span>{user.streak} DAY STREAK</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Consistency Score</div>
                            <div className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.consistencyScore}</div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Leaderboard;


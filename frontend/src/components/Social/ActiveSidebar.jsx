import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ActiveSidebar = () => {
    const { onlineUsers } = useSocket();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
            <h3 className={`text-xl font-black mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                ACTIVE NOW
            </h3>
            
            <div className="flex flex-col gap-4">
                {onlineUsers.length === 0 ? (
                    <p className="text-gray-500 text-sm">No gym bros online yet.</p>
                ) : (
                    onlineUsers.map((user) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 group"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                            }`}>
                                {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span className={`text-sm font-semibold truncate ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                                {user.name}
                            </span>
                            <FaCircle className="text-[8px] text-green-500 ml-auto" />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ActiveSidebar;

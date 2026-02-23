import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiActivity, FiStar, FiClock } from 'react-icons/fi';

const Profile = () => {
    const { user: clerkUser } = useUser();
    const { manualUser } = useAuth();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    const userName = manualUser?.name || clerkUser?.fullName || "Gym Member";
    const userEmail = manualUser?.email || clerkUser?.primaryEmailAddress?.emailAddress || "Not Provided";

    // Dummy data for visual representation
    const memberSince = "August 2023";
    const plan = "JGEC Student Pass";
    const expiry = "May 2024 (End of Semester)";
    const trainer = "Gym Secretary / Self";
    const phone = "+91 9876543210";
    const bloodGroup = "O+";
    const address = "Jalpaiguri, West Bengal";

    const cardClasses = isDark
        ? "border-slate-700/50 bg-slate-900/60 shadow-xl backdrop-blur-md"
        : "border-slate-200/50 bg-white/60 shadow-xl backdrop-blur-md";

    const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
    const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
    const iconBg = isDark ? "bg-slate-800 text-cyan-400" : "bg-blue-50 text-blue-600";

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className={`p-8 rounded-3xl border ${cardClasses}`}>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar Section */}
                    <div className="relative group">
                        <div className={`w-36 h-36 rounded-full flex items-center justify-center text-5xl font-bold uppercase overflow-hidden ring-4 ring-offset-4 ${isDark ? 'ring-slate-800 ring-offset-slate-950 bg-slate-800 text-slate-200' : 'ring-slate-100 ring-offset-slate-50 bg-blue-100 text-blue-600'}`}>
                            {clerkUser?.imageUrl ? (
                                <img src={clerkUser.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                userName[0]
                            )}
                        </div>
                        <div className="absolute inset-0 rounded-full ring-inset ring-1 ring-white/20"></div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h1 className={`text-4xl font-extrabold tracking-tight ${textPrimary}`}>
                            {userName}
                        </h1>
                        <p className={`text-lg ${textSecondary} flex items-center justify-center md:justify-start gap-2`}>
                            <FiMail className="w-5 h-5" />
                            {userEmail}
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Active Member
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                Joined {memberSince}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Details */}
                <div className={`p-8 rounded-3xl border ${cardClasses}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-2xl ${iconBg}`}>
                            <FiUser className="w-6 h-6" />
                        </div>
                        <h2 className={`text-2xl font-bold ${textPrimary}`}>Personal Info</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiPhone className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Phone Number</p>
                                <p className={`font-medium ${textPrimary}`}>{phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiMapPin className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Address</p>
                                <p className={`font-medium ${textPrimary}`}>{address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiActivity className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Blood Group</p>
                                <p className={`font-medium ${textPrimary}`}>{bloodGroup}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gym Details */}
                <div className={`p-8 rounded-3xl border ${cardClasses}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-2xl ${isDark ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
                            <FiStar className="w-6 h-6" />
                        </div>
                        <h2 className={`text-2xl font-bold ${textPrimary}`}>Gym Details</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiStar className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Current Plan</p>
                                <p className={`font-medium ${textPrimary}`}>{plan}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiClock className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Plan Expiry</p>
                                <p className={`font-medium ${textPrimary}`}>{expiry}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                <FiUser className={`w-5 h-5 ${textSecondary}`} />
                            </div>
                            <div>
                                <p className={`text-sm ${textSecondary}`}>Assigned Trainer</p>
                                <p className={`font-medium ${textPrimary}`}>{trainer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

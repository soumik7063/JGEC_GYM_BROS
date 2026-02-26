import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import useAnalytics from '../hooks/useAnalytics';

const AnalyticsDashboard = () => {
  const { stats, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#F97316', '#EF4444'];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
          📊 Workout Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Track your fitness journey with detailed insights</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="📈"
          title="Total Workouts"
          value={stats.totalWorkouts}
          subtitle="Sessions completed"
          color="from-blue-500 to-blue-600"
          delay={0.1}
        />
        <StatsCard
          icon="🏋️"
          title="Most Performed"
          value={stats.mostPerformed.name}
          subtitle={`${stats.mostPerformed.count} times`}
          color="from-purple-500 to-purple-600"
          delay={0.2}
        />
        <StatsCard
          icon="🔥"
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle="Keep it up!"
          color="from-orange-500 to-red-500"
          delay={0.3}
        />
        <StatsCard
          icon="📊"
          title="Longest Streak"
          value={`${stats.longestStreak} days`}
          subtitle="Personal record"
          color="from-green-500 to-emerald-600"
          delay={0.4}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Workout Frequency */}
        <ChartCard title="📅 Weekly Workout Frequency" delay={0.5}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Monthly Workout Trend */}
        <ChartCard title="📈 Monthly Workout Trend" delay={0.6}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Exercise Distribution */}
        <ChartCard title="🎯 Exercise Distribution" delay={0.7}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.exerciseDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.exerciseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Exercise Breakdown */}
        <ChartCard title="💪 Exercise Breakdown" delay={0.8}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.exerciseDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="name" type="category" stroke="#6B7280" width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {stats.exerciseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value, subtitle, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
        <p className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {value}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  </motion.div>
);

// Chart Card Component
const ChartCard = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
  >
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default AnalyticsDashboard;

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const WeightTracker = () => {
  const { user } = useUser();
  const [weightHistory, setWeightHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (user?.id) {
      fetchWeightHistory();
    }
  }, [user?.id]);

  const fetchWeightHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/weight/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await res.json();
      if (data.success) {
        setWeightHistory(data.weightHistory);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch weight history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight || !date) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/weight/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          date,
          weight: parseFloat(weight),
          unit: 'kg'
        })
      });

      const data = await res.json();
      if (data.success) {
        setWeight('');
        setDate(new Date().toISOString().split('T')[0]);
        setShowForm(false);
        fetchWeightHistory();
      }
    } catch (error) {
      console.error('Failed to add weight:', error);
    }
  };

  if (loading && weightHistory.length === 0) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            ⚖️ Weight Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track your weight journey</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Add Weight'}
        </button>
      </motion.div>

      {/* Add Weight Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <form onSubmit={handleSubmit} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter weight"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </form>
        </motion.div>
      )}

      {/* Stats Cards */}
      {stats && stats.current && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Starting Weight"
            value={`${stats.starting} kg`}
            icon="🎯"
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            label="Current Weight"
            value={`${stats.current} kg`}
            icon="⚖️"
            color="from-green-500 to-emerald-600"
          />
          <StatCard
            label="Total Change"
            value={`${stats.change > 0 ? '+' : ''}${stats.change.toFixed(1)} kg`}
            icon={stats.change < 0 ? '📉' : '📈'}
            color={stats.change < 0 ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-500'}
          />
          <StatCard
            label="Progress"
            value={`${Math.abs(((stats.change / stats.starting) * 100)).toFixed(1)}%`}
            icon="💪"
            color="from-purple-500 to-purple-600"
          />
        </div>
      )}

      {/* Weight Chart */}
      {weightHistory.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Weight Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#6B7280" domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [`${value} kg`, 'Weight']}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="text-6xl mb-4">⚖️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Weight Data Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start tracking your weight to see your progress over time
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            + Add Your First Weight Entry
          </button>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
    <p className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
      {value}
    </p>
  </motion.div>
);

export default WeightTracker;

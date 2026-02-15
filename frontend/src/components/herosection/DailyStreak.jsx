import React, { useContext, useEffect, useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Auth from '../auth/Auth';
import { workoutContext } from '../../context/WorkoutContext';

const convertDate = (d) => {
  const [dd, mm, yyyy] = d.split("/");
  const paddedDD = dd.padStart(2, "0");
  const paddedMM = mm.padStart(2, "0");

  const formatted = `${yyyy}/${paddedMM}/${paddedDD}`;


  return formatted;
};

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The difference between try and triumph is a little umph.",
  "Don't limit your challenges, challenge your limits.",
  "Strive for progress, not perfection.",
  "The pain you feel today will be the strength you feel tomorrow."
];

const DailyStreak = () => {
  
  const data = useContext(workoutContext);
  const [dates, setDates] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    // Set random quote on component mount
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setRandomQuote(quote);
  }, []);

  useEffect(() => {
    if (data?.data?.user?.workouts) {
      const formatted = data.data.user.workouts.map(workout => ({
        date: convertDate(workout.date),
        count: 10
      }));
      setDates(formatted);   
    }
  }, [data]);

  // Calculate streak stats
  const totalWorkouts = dates.length;
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4'>
      <div className='max-w-5xl mx-auto'>
        
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='text-6xl mb-4'>🔥</div>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4'>
            Your Daily Streak
          </h1>
          <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
            Track your consistency and watch your fitness journey unfold
          </p>
        </div>

        {/* Auth Component */}
        <div className='mb-8'>
          <Auth />
        </div>

        {dates && dates.length > 0 ? (
          <>
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-orange-500'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Total Workouts</p>
                    <p className='text-3xl font-bold text-gray-800 dark:text-white mt-1'>{totalWorkouts}</p>
                  </div>
                  <div className='text-4xl'>💪</div>
                </div>
              </div>

              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Current Month</p>
                    <p className='text-3xl font-bold text-gray-800 dark:text-white mt-1'>{currentMonth}</p>
                  </div>
                  <div className='text-4xl'>📅</div>
                </div>
              </div>

              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>Keep it Up!</p>
                    <p className='text-xl font-bold text-gray-800 dark:text-white mt-1'>On Fire! 🔥</p>
                  </div>
                  <div className='text-4xl'>⭐</div>
                </div>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className='bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 mb-8 text-white'>
              <div className='flex items-start'>
                <div className='text-6xl mr-6 opacity-50'>"</div>
                <div>
                  <p className='text-xl md:text-2xl font-medium italic leading-relaxed'>
                    {randomQuote}
                  </p>
                  <div className='mt-4 flex items-center'>
                    <div className='h-1 w-16 bg-white opacity-50 rounded'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Section */}
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 overflow-x-auto'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>Activity Calendar</h2>
                <p className='text-gray-600 dark:text-gray-400'>Your workout consistency at a glance</p>
              </div>
              
              <div className='flex justify-center'>
                <HeatMap
                  value={dates}
                  width={600}
                  style={{ '--rhm-rect': '#e5e7eb' }}
                  startDate={new Date('2025/11/01')}
                  legendRender={(props) => <rect {...props} y={props.y + 10} rx={2} />}
                  rectProps={{
                    rx: 3.5
                  }}
                />
              </div>

            </div>

            {/* Encouragement Section */}
            <div className='mt-8 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8'>
              <div className='text-5xl mb-4'>🎯</div>
              <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                Consistency is Key!
              </h3>
              <p className='text-gray-600 dark:text-gray-400 max-w-xl mx-auto'>
                Every workout counts towards building a stronger, healthier you. Keep showing up and the results will follow!
              </p>
            </div>
          </>
        ) : (
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center'>
            <div className='text-7xl mb-6'>📊</div>
            <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
              Start Your Journey Today
            </h3>
            <p className='text-gray-600 dark:text-gray-400 text-lg mb-6'>
              Please log in to see your daily streak and track your fitness progress.
            </p>
            <div className='bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 max-w-md mx-auto'>
              <p className='text-blue-800 dark:text-blue-300 font-medium'>
                💡 Your consistency will be visualized here once you start logging workouts!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyStreak;
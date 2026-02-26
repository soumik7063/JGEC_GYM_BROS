import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const useAnalytics = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id
        })
      });

      const data = await res.json();

      if (data.success) {
        setStats(data.stats);
      } else {
        setError(data.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user?.id]);

  return { stats, loading, error, refetch: fetchAnalytics };
};

export default useAnalytics;

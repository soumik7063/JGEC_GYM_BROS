/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const workoutContext = createContext();

const WorkoutContext = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getWorkouts = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/getworkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.message || "Unable to fetch workouts.");
      }

      setData(payload);
    } catch (fetchError) {
      setError(fetchError.message);
      toast.error(fetchError.message || "Failed to fetch workouts.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      getWorkouts();
      return;
    }
    setData(null);
    setError(null);
  }, [getWorkouts, isLoaded, isSignedIn]);

  const handelWorkout = async ({ date, exercises }) => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          date,
          exercises,
        }),
      });
      const payload = await response.json();

      if (!payload.success) {
        throw new Error(payload.message || "Unable to save workout.");
      }

      setData(payload);
      toast.success("Workout saved successfully.");
    } catch (submitError) {
      setError(submitError.message);
      toast.error(submitError.message || "Failed to save workout.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (name, exercises) => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, name, exercises }),
      });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.message || "Unable to save template.");
      }
      setData({ ...data, user: payload.user });
      toast.success("Template saved successfully.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to save template.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (name) => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, name }),
      });
      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.message || "Unable to delete template.");
      }
      setData({ ...data, user: payload.user });
      toast.success("Template deleted successfully.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete template.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <workoutContext.Provider
      value={{
        loading,
        data,
        error,
        handelWorkout,
        handleSaveTemplate,
        handleDeleteTemplate,
        refreshWorkouts: getWorkouts,
      }}
    >
      {children}
    </workoutContext.Provider>
  );
};

export { WorkoutContext, workoutContext };
export default WorkoutContext;

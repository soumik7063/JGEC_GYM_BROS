/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const workoutContext = createContext();

const WorkoutContext = ({ children }) => {
  const { isSignedIn: isClerkSignedIn, isLoaded: isClerkLoaded, user: clerkUser } = useUser();
  const { manualUser, token, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const activeUser = clerkUser || manualUser;
  const isUserAuthenticated = isClerkSignedIn || !!manualUser;
  const userId = clerkUser?.id || manualUser?.userId || manualUser?.email;

  const getWorkouts = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/getworkout`, {
        method: "POST",
        headers,
        body: JSON.stringify({ userId }),
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
  }, [userId, token]);

  useEffect(() => {
    if (!isClerkLoaded || authLoading) return;
    if (isUserAuthenticated) {
      getWorkouts();
      return;
    }
    setData(null);
    setError(null);
  }, [getWorkouts, isClerkLoaded, authLoading, isUserAuthenticated]);

  const handelWorkout = async ({ date, exercises }) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          userId,
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
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
        method: "POST",
        headers,
        body: JSON.stringify({ userId, name, exercises }),
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
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/template`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ userId, name }),
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

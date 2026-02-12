import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { SignIn } from "@clerk/clerk-react";
const workoutContext = createContext();

const WorkoutContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [data, setdata] = useState(null);
  const getWorkouts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getworkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?.id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("getuser", data);
        setdata(data);
        console.log("Workouts fetched successfully", data);
      } else {
        console.log("Failed to fetch workouts", data);
      }
    } catch (error) {
      console.log("Failed to fetch workouts", error);
    } finally {
      setLoading(false);
    }
  };

  const ensureUserInDB = async () => {
    // Ensure the Clerk user exists in the backend DB before fetching workouts
    try {
      if (!user || !user.isSignedIn) return;
      const payload = {
        userId: user?.user?.id,
        name: user?.user?.fullName || "",
        email: user?.user?.primaryEmailAddress?.emailAddress || "",
      };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Ensured DB user exists", data);
      } else {
        console.warn("Failed to ensure DB user", data);
      }
    } catch (err) {
      console.error("Error ensuring DB user", err);
    }
  };

  useEffect(() => {
    if (user && user.isSignedIn) {
      (async () => {
        await ensureUserInDB();
        await getWorkouts();
      })();
      return;
    }
  }, [user?.isSignedIn, user?.isLoaded]);

  const handelWorkout = async ({ date, exercises }) => {
    console.log("Adding workout for date:", date, "with exercises:", exercises);
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.user?.id,
          date: date,
          exercises: exercises,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Workout added successfully", data);
        // Set data with the proper structure
        setdata({
          success: data.success,
          user: data.user,
        });
        setSuccess("Workout added successfully");
        // Refresh workouts to ensure latest data
        await getWorkouts();
      } else {
        console.log("Failed to add workout", data);
        setError(data.message);
      }
    } catch (error) {
      console.log("Failed to add workout", error);
      setError("Failed to add workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <workoutContext.Provider value={{ loading, handelWorkout, data }}>
        {children}
      </workoutContext.Provider>
    </div>
  );
};
export { WorkoutContext, workoutContext };
export default WorkoutContext;

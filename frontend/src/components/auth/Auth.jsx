import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef } from "react";

const Auth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const lastSyncedUser = useRef(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;
    if (lastSyncedUser.current === user.id) return;

    const syncUser = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            name: user.fullName || "Gym Bros User",
            email: user.primaryEmailAddress?.emailAddress || "unknown@jgec.edu",
          }),
        });
        lastSyncedUser.current = user.id;
      } catch (error) {
        console.error("Failed to sync user:", error);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return null;
};

export default Auth;

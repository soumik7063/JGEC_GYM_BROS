import React from "react";
import DailyStreak from "./DailyStreak";
import Dashboard from "./Dashboard";

const Herosection = () => {
  return (
    <div className="space-y-10">
      <DailyStreak />
      <Dashboard />
    </div>
  );
};

export default Herosection;

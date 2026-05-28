import React from "react";
import DailyStreak from "./DailyStreak";
import Dashboard from "./Dashboard";
import Form from "../Form";
import Statistics from "../Statistics";

const Herosection = () => {
  return (
    <div className="space-y-10">
      <DailyStreak />
      <Dashboard />
      <Form/>
      <Statistics/>
    </div>
  );
};

export default Herosection;

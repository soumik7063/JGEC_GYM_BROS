import Navbar from './navbar/Navbar'
import Herosection from './components/herosection/Herosection'
import Footer from './navbar/Footer'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import WeightTracker from './components/WeightTracker'
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Community from "./pages/Community";
import { useAuth } from "./context/AuthContext";
import Profile from "./components/profile/Profile";
import Leaderboard from "./pages/Leaderboard";
import { useState } from 'react';


const App = () => {
  const { manualUser } = useAuth();
  const { isSignedIn: isClerkSignedIn } = useUser();

  const isUserAuthenticated = isClerkSignedIn || !!manualUser;

  return (
    <div className="min-h-screen app-shell">
      <Navbar/>
      {(isUserAuthenticated) ? (
          <Routes>
            <Route path='/' element={<Herosection/>}/>
            <Route path='/community' element={<Community/>}/>
            <Route path='/weight-tracker' element={<WeightTracker/>}/>
            <Route path='/analytics' element={<AnalyticsDashboard/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
      ) : (

        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-10">
          <SignIn/>
        </div>
      )}
      <Footer/>
      </div>
    );
  };

export default App;

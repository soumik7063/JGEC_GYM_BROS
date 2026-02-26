import React, { useState } from "react";
import Navbar from "./navbar/Navbar";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import Herosection from "./components/herosection/Herosection";
import Form from "./components/Form";
import Statistics from "./components/Statistics";
import Footer from "./navbar/Footer";
import ManualAuth from "./components/auth/ManualAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import Community from "./pages/Community";
import { useAuth } from "./context/AuthContext";
import Profile from "./components/profile/Profile";

const App = () => {
  const { manualUser } = useAuth();
  const { isSignedIn: isClerkSignedIn } = useUser();
  const [activeView, setActiveView] = useState('home');

  const isUserAuthenticated = isClerkSignedIn || !!manualUser;

  return (
    <div className="min-h-screen app-shell">
      <Navbar setActiveView={setActiveView} />
      {(isUserAuthenticated) ? (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {activeView === 'profile' ? (
            <Profile />
          ) : (
            <div className="space-y-10">
              <Herosection />
              <section>
                <Form />
              </section>
              <section className="pb-12">
                <Statistics />
              </section>
            </div>
          )}
        </main>
      ) : (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-10">
          <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
                <SignIn />
              </div>
            </div>
            <div className="flex justify-center">
              <ManualAuth />
            </div>
          </div>
          <div className="flex justify-center">
            <ManualAuth />
          </div>
        </div>
      )}
      </div>
    );
  };

export default App;

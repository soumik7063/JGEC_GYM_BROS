import Navbar from './navbar/Navbar'
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import Herosection from './components/herosection/Herosection'
import Form from './components/Form'
import Statistics from './components/Statistics'
import Footer from './navbar/Footer'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import WeightTracker from './components/WeightTracker'
import Navbar from "./navbar/Navbar";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Herosection from "./components/herosection/Herosection";
import Form from "./components/Form";
import Statistics from "./components/Statistics";
import Footer from "./navbar/Footer";

const App = () => {
  return (
    <div className="min-h-screen app-shell">
      <Navbar />
      <SignedIn>
        <Herosection/>
        <Form/>
        <Statistics/>
        <AnalyticsDashboard/>
        <WeightTracker/>
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <Herosection />
            <section>
              <Form />
            </section>
            <section className="pb-12">
              <Statistics />
            </section>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-[80vh] items-center justify-center px-4">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <SignIn />
          </div>
        </div>
      </SignedOut>
      <Footer />
    </div>
  );
};

export default App;

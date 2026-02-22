import Navbar from './navbar/Navbar'
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import Herosection from './components/herosection/Herosection'
import Form from './components/Form'
import Statistics from './components/Statistics'
import Footer from './navbar/Footer'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import WeightTracker from './components/WeightTracker'

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar/>
      <SignedIn>
        <Herosection/>
        <Form/>
        <Statistics/>
        <AnalyticsDashboard/>
        <WeightTracker/>
      </SignedIn>
      <SignedOut>
        <div className='flex justify-center items-center h-[80vh]'>
          <SignIn/>
        </div>
      </SignedOut>
      <Footer/>
    </div>
  )
}

export default App
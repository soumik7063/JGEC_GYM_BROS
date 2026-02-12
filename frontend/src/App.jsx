import Navbar from "./navbar/Navbar";
import Footer from "./navbar/Footer";
import { SignedIn } from "@clerk/clerk-react";
import Herosection from "./components/herosection/Herosection";
import Form from "./components/Form";
import Statistics from "./components/Statistics";
import SignOutPage from "./components/auth/SignOutPage";
import BackgroundVideo from "./components/common/BackgroundVideo";

const App = () => {
  return (
    <>
      <Navbar />

      {/* ========== WHEN USER IS LOGGED IN ========== */}
      <SignedIn>
        <BackgroundVideo
          src="https://res.cloudinary.com/dmx8lpl28/video/upload/v1770900401/14170420_1920_1080_25fps_dfohwa.mp4"
          overlayClass="bg-black/60"
        />
        <Herosection />
        <Form />
        <Statistics />
      </SignedIn>

      {/* ========== WHEN USER IS LOGGED OUT ========== */}
      <SignOutPage />

      <Footer />
    </>
  );
};

export default App;

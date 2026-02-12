import { SignedOut, SignIn } from "@clerk/clerk-react";
import { TypeAnimation } from "react-type-animation";
import { signInAppearance } from "../../config/clerkAppearance";

const SignOutPage = () => {
  return (
    <SignedOut>
      <div className="min-h-screen pt-20 w-full overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-[calc(100vh+80px)] md:h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dmx8lpl28/video/upload/v1770896519/11300031-hd_1920_1080_24fps_rtbd7v.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay */}
        <div className="absolute h-[calc(100vh+80px)] md:h-full inset-0 bg-black/70"></div>

        {/* Content Container */}
        <div className="relative z-10 flex min-h-[calc(100vh-80px)] md:h-full flex-col md:flex-row">
          {/* LEFT SIDE - QUOTES */}
          <div className="hidden md:flex w-1/2 items-center justify-center px-12 text-white">
            <div className="max-w-lg">
              <h1 className="text-5xl font-extrabold leading-tight drop-shadow-[0_0_4px_rgba(249,115,22,0.7)]">
                Build Your <span className="text-orange-500">Strength</span>
              </h1>

              <TypeAnimation
                sequence={[
                  "Discipline is choosing between what you want now and what you want most.",
                  2000,
                  "No pain. No gain.",
                  2000,
                  "Train insane or remain the same.",
                  2000,
                ]}
                wrapper="p"
                speed={50}
                repeat={Infinity}
                className="mt-6 text-lg text-gray-300"
              />
            </div>
          </div>

          {/* RIGHT SIDE - SIGN IN FORM */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <SignIn appearance={signInAppearance} />
          </div>
        </div>
      </div>
    </SignedOut>
  );
};

export default SignOutPage;

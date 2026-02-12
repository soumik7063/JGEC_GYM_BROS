import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#00000060] border-b border-orange-500/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* LEFT - LOGO + BRAND */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Gym Bros Logo"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-orange-500 shadow-md"
          />

          <div>
            <h1 className="text-lg md:text-2xl font-extrabold tracking-wide leading-tight">
              <span className="text-white">GYM</span>{" "}
              <span className="text-orange-500">BROS</span>
            </h1>
            <p className="text-[10px] md:text-xs text-gray-400">
              Strength & Unity
            </p>
          </div>
        </div>

        {/* CENTER - TITLE (Desktop Only) */}
        <div className="hidden md:block text-center">
          <h2 className="text-lg font-semibold text-gray-300 tracking-wide">
            College Gym of JGEC
          </h2>
        </div>

        {/* RIGHT - AUTH (Desktop Only) */}
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton>
              <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-3">
              <span className="text-gray-300 text-sm font-medium">
                {user?.firstName ? `${user.firstName}` : "Welcome"}
              </span>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-orange-500 shadow-md",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

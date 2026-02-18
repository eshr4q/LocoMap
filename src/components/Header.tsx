import { useStationStore } from "../store/useStationStore";
import ModernTrainIcon from "../assets/icons/TrainIcon";

const Header = () => {
  const { filterCity, setFilterCity } = useStationStore();
  const isTyping = filterCity.length > 0;

  return (
    <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center px-4 md:px-6 z-20 relative">
      <div className="flex items-center gap-4 md:gap-6 w-full max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="hidden md:flex items-center gap-2 min-w-fit">
          <h1 className="text-3xl font-black text-purple-700 tracking-tight">
            LocoMap
          </h1>
          <span className="w-2.5 h-2.5 bg-purple-600/50 rounded-full animate-pulse mt-1"></span>
        </div>

        {/* Search Bar Section */}
        <div className="grow flex items-center bg-gray-100 border border-transparent rounded-lg focus-within:bg-white focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-300 h-12 px-4 relative overflow-hidden">
          {/* Static Search Icon */}
          <svg
            className="w-5 h-5 text-gray-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search city..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-base md:text-lg ml-3 min-w-0"
          />

          <div className="flex items-center gap-2 ml-2 shrink-0">
            {isTyping && (
              <button
                onClick={() => setFilterCity("")}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                title="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            <div className="h-6 w-px bg-gray-300 mx-1"></div>

            {/* Animated Train Section */}
            <div className="flex items-center gap-2 text-purple-500 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out">
              <ModernTrainIcon
                className={`text-purple-600 transition-transform duration-300 ${
                  isTyping ? "scale-110" : "scale-100"
                }`}
              />

              <span
                className={`
                  text-gray-500 font-medium hidden sm:inline-block transition-all duration-500 ease-in-out
                  ${
                    isTyping
                      ? "max-w-0 opacity-0 -translate-x-2"
                      : "max-w-37.5 opacity-100 translate-x-0"
                  }
                `}
              >
                Station Explorer
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

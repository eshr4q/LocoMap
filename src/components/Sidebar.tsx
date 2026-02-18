import { useState } from 'react';
import StationList from './StationList';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div 
      className={`
        relative bg-purple-700 h-full flex flex-col shadow-2xl transition-all duration-300 ease-in-out z-10
        ${isOpen ? 'w-64 md:w-80 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0'} 
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-10 top-24 bg-purple-700 text-white p-2 rounded-r-lg shadow-md cursor-pointer hover:bg-purple-600 transition-colors w-10 flex items-center justify-center z-50"
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <svg 
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`flex flex-col h-full overflow-hidden ${!isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-opacity duration-200`}>
        
        {/* Mobile-Only Logo Section */}
        <div className="md:hidden p-6 border-b border-purple-600/50 flex items-center gap-2">
           <h1 className="text-2xl font-black text-white tracking-tight">
            LocoMap
          </h1>
          <span className="w-2 h-2 bg-white rounded-full animate-pulse mt-1"></span>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-2 md:pt-6">
          <StationList />
        </div>

        {/* Footer */}
        <div className="p-4 bg-purple-800/30 text-center">
          <p className="text-xs text-purple-300">
            Frontend Assignment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

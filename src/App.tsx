import { useEffect } from "react";
import { useStationStore } from "./store/useStationStore";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import Header from "./components/Header";

function App() {
  const { fetchStations, isLoading, error } = useStationStore();

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 text-purple-700 font-bold">
        Loading LocoMap...
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />

        <div className="flex-1 relative z-0">
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default App;

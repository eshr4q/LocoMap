import { useStationStore } from '../store/useStationStore';

const StationList = () => {
  const { stations, filterCity, selectedStationId, setSelectedStationId } = useStationStore();

  const filteredStations = stations.filter((station) =>
    station.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  if (filteredStations.length === 0) {
    return (
      <div className="p-8 text-purple-200 text-center opacity-70">
        <p>No stations found.</p>
        <p className="text-sm mt-2">Try searching for "Hamburg" or "Köln"</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-purple-800/30">
      {filteredStations.map((station) => (
        <li
          key={station.id}
          onClick={() => setSelectedStationId(station.id)}
          className={`
            p-4 cursor-pointer transition-all duration-200 
            hover:bg-purple-600/50 border-l-4
            ${selectedStationId === station.id 
              ? 'bg-purple-800/50 border-white' 
              : 'border-transparent'
            }
          `}
        >
          <div className="font-bold text-white text-base">{station.name}</div>
          <div className="text-sm text-purple-200">{station.city}</div>
        </li>
      ))}
    </ul>
  );
};

export default StationList;

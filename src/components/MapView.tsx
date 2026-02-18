import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useStationStore } from "../store/useStationStore";
import { useEffect } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map flying
const MapController = () => {
  const { stations, selectedStationId } = useStationStore();
  const map = useMap();

  useEffect(() => {
    if (selectedStationId) {
      const station = stations.find((s) => s.id === selectedStationId);
      if (station) {
        map.flyTo([station.lat, station.lng], 13, {
          duration: 1.5,
        });
      }
    }
  }, [selectedStationId, stations, map]);

  return null;
};

const MapView = () => {
  const { getFilteredStations, setSelectedStationId } = useStationStore();
  const filteredStations = getFilteredStations();

  return (
    <MapContainer
      center={[51.1657, 10.4515]}
      zoom={6}
      className="h-full w-full z-0"
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController />

      {filteredStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          eventHandlers={{
            click: () => setSelectedStationId(station.id),
          }}
        >
          <Popup>
            <div className="font-bold">{station.name}</div>
            <div className="text-gray-600">{station.city}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;

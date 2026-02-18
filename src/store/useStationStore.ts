import { create } from "zustand";
import axios from "axios";
import type { Station } from "../types/station";

const API_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json";

interface StationState {
  stations: Station[];
  isLoading: boolean;
  error: string | null;
  filterCity: string;
  selectedStationId: number | null;

  fetchStations: () => Promise<void>;
  setFilterCity: (city: string) => void;
  setSelectedStationId: (id: number | null) => void;

  getFilteredStations: () => Station[];
}

// initial state properties.
const initialState = {
  stations: [],
  isLoading: false,
  error: null,
  filterCity: "",
  selectedStationId: null,
};

//fot the test file to use.
export { initialState };

export const useStationStore = create<StationState>((set, get) => ({
  ...initialState,

  fetchStations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Station[]>(API_URL);
      set({ stations: response.data, isLoading: false });
    } catch (err) {
      set({
        error: "Failed to fetch station data. Please try again.",
        isLoading: false,
      });
      console.error(err);
    }
  },

  setFilterCity: (city) => set({ filterCity: city }),

  setSelectedStationId: (id) => set({ selectedStationId: id }),

  getFilteredStations: () => {
    const { stations, filterCity } = get();
    if (!filterCity) return stations;

    const lowerFilter = filterCity.toLowerCase();
    return stations.filter((station) =>
      station.city.toLowerCase().includes(lowerFilter)
    );
  },
}));

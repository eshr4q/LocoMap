import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import App from "../App";
import axios from "axios";
import { useStationStore, initialState } from "../store/useStationStore";

vi.mock("axios");

vi.mock("../components/MapView", () => ({
  default: () => <div data-testid="map-mock">Map Placeholder</div>,
}));

// --- TEST DATA ---
const mockStations = [
  { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5, lng: 13.4 },
  { id: 2, name: "Hamburg Hbf", city: "Hamburg", lat: 53.5, lng: 10.0 },
  { id: 3, name: "Munich Hbf", city: "Munich", lat: 48.1, lng: 11.5 },
];

describe("App Search Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (axios.get as any).mockResolvedValue({ data: mockStations });

    useStationStore.setState(initialState);
  });

  it("filters the station list when user types in the search bar", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
      expect(screen.getByText("Hamburg Hbf")).toBeInTheDocument();
      expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search city/i);
    await user.type(searchInput, "Berlin");

    expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();

    expect(screen.queryByText("Hamburg Hbf")).not.toBeInTheDocument();
    expect(screen.queryByText("Munich Hbf")).not.toBeInTheDocument();
  });

  it("shows all stations again when the search bar is cleared", async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search city/i);

    await user.type(searchInput, "Berlin");
    expect(screen.queryByText("Hamburg Hbf")).not.toBeInTheDocument();

    await user.clear(searchInput);

    expect(screen.getByText("Berlin Hbf")).toBeInTheDocument();
    expect(screen.getByText("Hamburg Hbf")).toBeInTheDocument();
    expect(screen.getByText("Munich Hbf")).toBeInTheDocument();
  });
});

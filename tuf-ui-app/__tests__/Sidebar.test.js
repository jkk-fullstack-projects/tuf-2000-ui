import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "../src/app/components/Sidebar/Sidebar.js";
import React from "react";

// Mocking fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: "Mocked Fetch Data" }),
    })
);

describe("Sidebar", () => {
    it("fetches meter data on button click", async () => {
        it("renders the sidebar", () => {
            render(<Sidebar />);
            expect(screen.getByText("Sidebar")).toBeInTheDocument();
        });
    // Find and click the "Get Meter Data" button
    const getMeterDataButton = screen.getByRole("button", { name: /Get Meter Data/i });
    fireEvent.click(getMeterDataButton);
    // Check if fetch was called with the correct endpoint
    // expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/data"));

    // Check if the fetched data is rendered
    const fetchedData = await screen.findByText("mockData");
    expect(fetchedData).toBeInTheDocument();
    });
});
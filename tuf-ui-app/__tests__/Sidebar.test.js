import { render, screen } from "@testing-library/react";
import Sidebar from "../src/app/Sidebar";

describe("Sidebar", () => {
    it("renders the sidebar", () => {
        render(<Sidebar />);
        expect(screen.getByText("sidebar")).toBeInTheDocument();
    });
});
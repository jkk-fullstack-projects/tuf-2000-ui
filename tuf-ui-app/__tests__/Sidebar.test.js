import { render, screen } from "@testing-library/react";
import Sidebar from "../src/app/components/Sidebar/Sidebar.js";

describe("Sidebar", () => {
    it("renders the sidebar", () => {
        render(<Sidebar />);
        expect(screen.getByText("Sidebar")).toBeInTheDocument();
    });
});
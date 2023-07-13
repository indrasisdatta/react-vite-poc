import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";

describe("Dashboard display", () => {
  test("Render dashboard", () => {
    render(<Dashboard />);
    // screen.debug();
    const element = screen.getByText(/Welcome/);
    expect(element).toBeInTheDocument();
  });
});

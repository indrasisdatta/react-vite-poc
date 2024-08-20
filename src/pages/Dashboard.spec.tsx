import { render } from "@testing-library/react";
import { Dashboard } from "./Dashboard";

describe("Dashboard display", () => {
  test("Render dashboard", () => {
    render(<Dashboard />);
    // const element = screen.getByText(/Welcome/);
    // expect(element).toBeInTheDocument();
  });
});

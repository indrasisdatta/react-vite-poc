import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "../../Providers/ThemeProvider";
import { ThemeSwitch } from "./ThemeSwitch";
import { vi } from "vitest";

describe("Theme Switch", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn(() => ({
        matches: true,
        addListender: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    const store = {};
    /* Mock the `localStorage.getItem` method */
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (store as any)[key];
    });

    /* Mock the `localStorage.setItem` method */
    vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return ((store as any)[key] = value + "");
    });
  });

  test("Render switch", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    );
    const themeSwitch = await screen.findByTestId("theme-switch");
    expect(themeSwitch).toBeInTheDocument();
  });

  test("Dynamic CSS class name", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    );
    waitFor(async () => {
      const themeSwitch = await screen.findByTestId("theme-switch");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((themeSwitch as any)?.checked) {
        console.log("HTML class", document.documentElement.className);
        expect(document.documentElement).toHaveClass("dark");
      } else {
        expect(document.documentElement).not.toHaveClass("dark");
      }
    });
  });

  test("Theme toggle", async () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    );
    const themeSwitch = await screen.findByTestId("theme-switch");
    /* Set light mode */
    fireEvent.change(themeSwitch, { target: { checked: false } });
    waitFor(() => {
      expect(document.documentElement).not.toHaveClass("dark");
      expect(document.body).not.toHaveClass("dark:text-white");
      expect(document.body).not.toHaveClass("dark:bg-dark");
    });
    /* Set dark mode */
    fireEvent.change(themeSwitch, { target: { checked: true } });
    waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
      expect(document.body).toHaveClass("dark:text-white");
      expect(document.body).toHaveClass("dark:bg-dark");
    });
  });
});

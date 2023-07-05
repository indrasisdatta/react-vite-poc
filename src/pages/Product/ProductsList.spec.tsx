import { render, screen } from "@testing-library/react";
import { ProductsList } from "./ProductsList";
import { QueryClient, QueryClientProvider } from "react-query";
import { vi } from "vitest";

const setMockData = async (data: any) => {
  vi.mock("react-query", async (data) => ({
    ...(await vi.importActual<typeof import("react-query")>("react-query")),
    useQuery: () => data,
  }));
};

beforeAll(() => {
  setMockData({
    isSuccess: false,
    isError: true,
    isLoading: false,
    data: [],
    error: null,
  });
});

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Products List", () => {
  test("Grid display", () => {
    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );
    // screen.debug();
  });
});

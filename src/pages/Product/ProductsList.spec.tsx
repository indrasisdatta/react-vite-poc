import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductsList } from "./ProductsList";
import { QueryClient, QueryClientProvider } from "react-query";
import { vi } from "vitest";
import {
  loadedError,
  loadedSuccess,
} from "../../mock/products/ProductsListMock";
import { server } from "../../mock/server";
import { rest } from "msw";
// import { mockedFunctions } from "../../mockFunctions";

const queryclient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   retry: false,
    // },
  },
});

/* beforeEach(() => {
  vi.mock("react-query", async () => ({
    ...(await vi.importActual<typeof import("react-query")>("react-query")),
    useQuery: () => {
      // console.log("beforeEach: ", expect.getState());
      const testName = expect
        .getState()
        .currentTestName?.split(">")
        ?.pop()
        ?.trim();
      switch (testName) {
        case "API Success - Grid data render":
          return loadedSuccess;
        case "API Error - check error message":
          return loadedError;
        default:
          return {
            isSuccess: false,
            isError: false,
            isLoading: true,
            data: null,
            error: null,
          };
      }
    },
  }));
}); */

describe("Products List", () => {
  test("Check loader", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );
    const element = await screen.findByTestId("loader");
    expect(element).toBeInTheDocument();
  });

  test("API Success - Grid data render", async () => {
    //screen.debug();
    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );

    // await waitFor(() => {
    //   screen.debug();
    // });
    await waitFor(async () => {
      const prodTable = await screen.findByTestId("product-table");
      // const tableRows = await screen.findAllByRole("row");
      console.log("Prod table", prodTable.children.length);
      expect(prodTable.children.length).toBe(4);
    });
  });

  test("API Error - check error message", async () => {
    server.use(
      rest.get("https://dummyjson.com/products", async (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    waitFor(async () => {
      render(
        <QueryClientProvider client={queryclient}>
          <ProductsList />
        </QueryClientProvider>
      );
      screen.debug();
      const errorLabel = await screen.findByText(/Error fetching records/);
      expect(errorLabel).toBeInTheDocument();
    });
  });

  test("Save success label", async () => {
    vi.mock("react-router-dom", async () => {
      return {
        ...vi.importActual("react-router-dom"),
        NavLink: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement("a", { href: to }, children),
        useLocation: () => ({
          state: { addSuccess: 1 },
        }),
      };
    });

    await waitFor(() => {
      render(
        <QueryClientProvider client={queryclient}>
          <ProductsList />
        </QueryClientProvider>
      );
      const element = screen.getByText(/New product added/);
      expect(element).toBeInTheDocument();
    });
  });
});

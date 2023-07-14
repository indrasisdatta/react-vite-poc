import { render, screen, waitFor } from "@testing-library/react";
import { ProductsList } from "../ProductsList";
import { QueryClient, QueryClientProvider } from "react-query";
import { server } from "../../../../mock/server";
import { rest } from "msw";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Products List", () => {
  test("API Success - Grid data render", async () => {
    //screen.debug();
    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );
    await waitFor(async () => {
      const prodTable = await screen.findByTestId("product-table");
      // const tableRows = await screen.findAllByRole("row");
      console.log("Prod table", prodTable.children.length);
      expect(prodTable.children.length).toBe(4);
    });
  });

  test("API Error - check error message", async () => {
    server.use(
      rest.get("https://dummyjson.com/products", async (_req, res, ctx) => {
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
});

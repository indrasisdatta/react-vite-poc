import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AddProduct } from "../AddProduct";
import { QueryClient, QueryClientProvider } from "react-query";
import { vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { mockedFunctions } from "../../../../mockFunctions";
// import { ThemeProvider } from "../../../../Providers/ThemeProvider";
import { ProductsList } from "../../ListProduct/ProductsList";
import { server } from "../../../../mock/server";
import { rest } from "msw";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// const navigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  //   return {
  //     ...vi.importActual("react-router-dom"),
  //     useNavigate: () => navigate,
  //   };
  return actual;
});

describe("Add Product", () => {
  test("Form submit success", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/add"]}>
          <QueryClientProvider client={queryclient}>
            <Routes>
              <Route path="product">
                <Route element={<ProductsList />} index />
                <Route path="add" element={<AddProduct />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    const titleInput = await screen.findByPlaceholderText(/Product Name/);
    const priceInput = await screen.findByRole("spinbutton", {
      name: /price/i,
    });
    const descInput = await screen.findByPlaceholderText(/Product Description/);
    const tagInput = await screen.findByTestId(/tag-/);

    fireEvent.change(titleInput, { target: { value: "Test title" } });
    fireEvent.change(priceInput, { target: { value: "100.50" } });
    fireEvent.change(descInput, {
      target: { value: "Sample product description" },
    });
    fireEvent.change(tagInput, { target: { value: "Tag 1" } });

    const form = screen.getByTestId("productForm");

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const element = screen.getByText(/New product added/);
      expect(element).toBeInTheDocument();
    });
  });

  test("Form submit error", async () => {
    server.use(
      rest.post(
        "https://dummyjson.com/products/add",
        async (_req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/add"]}>
          <QueryClientProvider client={queryclient}>
            <Routes>
              <Route path="product">
                <Route element={<ProductsList />} index />
                <Route path="add" element={<AddProduct />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    const titleInput = await screen.findByPlaceholderText(/Product Name/);
    const priceInput = await screen.findByRole("spinbutton", {
      name: /price/i,
    });
    const descInput = await screen.findByPlaceholderText(/Product Description/);
    const tagInput = await screen.findByTestId(/tag-/);

    fireEvent.change(titleInput, { target: { value: "Test title" } });
    fireEvent.change(priceInput, { target: { value: "100.50" } });
    fireEvent.change(descInput, {
      target: { value: "Sample product description" },
    });
    fireEvent.change(tagInput, { target: { value: "Tag 1" } });

    const form = screen.getByTestId("productForm");

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      const element = screen.getByText(/Error!/);
      expect(element).toBeInTheDocument();
    });
  });
});

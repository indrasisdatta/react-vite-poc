import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditProduct } from "../EditProduct";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductsList } from "../../ListProduct/ProductsList";
import { vi } from "vitest";

const queryclient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       retry: false,
  //     },
  //   },
});

// beforeEach(() => {
//   vi.mock("react-query", async () => ({
//     ...(await vi.importActual<typeof import("react-query")>("react-query")),
//     useQuery: () => editProductData,
//   }));
// });

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  //   return {
  //     ...vi.importActual("react-router-dom"),
  //     useNavigate: () => navigate,
  //   };
  return actual;
});

describe("Edit Product", async () => {
  test("Form submit success", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/4"]}>
          <QueryClientProvider client={queryclient}>
            <Routes>
              <Route path="product">
                <Route element={<ProductsList />} index />
                <Route path=":prodId" element={<EditProduct />} />
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
      const element = screen.getByText(/Product updated successfully/);
      expect(element).toBeInTheDocument();
    });
  });

  test("Form submit error", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/product/4"]}>
          <QueryClientProvider client={queryclient}>
            <Routes>
              <Route path="product">
                <Route element={<ProductsList />} index />
                <Route path=":prodId" element={<EditProduct />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    waitFor(async () => {
      const titleInput = await screen.findByPlaceholderText(/Product Name/);
      const priceInput = await screen.findByRole("spinbutton", {
        name: /price/i,
      });
      const descInput = await screen.findByPlaceholderText(
        /Product Description/
      );
      const tagInput = await screen.findByTestId(/tag-/);

      fireEvent.change(titleInput, { target: { value: "Test title" } });
      fireEvent.change(priceInput, { target: { value: "100.50" } });
      fireEvent.change(descInput, {
        target: { value: "Sample product description" },
      });
      fireEvent.change(tagInput, { target: { value: "Tag 1" } });

      const form = screen.getByTestId("productForm");

      //   await act(async () => {
      fireEvent.submit(form);
      //   });

      const element = await screen.findByText(/Error!/);
      expect(element).toBeInTheDocument();
    });
  });
});

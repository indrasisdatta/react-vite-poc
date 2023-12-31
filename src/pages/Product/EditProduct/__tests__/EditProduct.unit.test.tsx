import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { editProductData } from "../../../../mock/products/ProductsListMock";
import { EditProduct } from "../EditProduct";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// beforeEach(() => {
//   vi.mock("react-query", async () => ({
//     ...(await vi.importActual<typeof import("react-query")>("react-query")),
//     useQuery: () => editProductData,
//   }));
// });

describe("Edit Product", async () => {
  test("Render all fields correctly", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );
    waitFor(async () => {
      const productName = await screen.findByPlaceholderText(/Product Name/);
      const price = await screen.findByLabelText(/Price/);
      const description = await screen.findByPlaceholderText(/Description/);
      const tag = await screen.findByTestId(/tag-/);
      expect(productName).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(tag).toBeInTheDocument();
    });
  });

  test("Populate field values", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );
    const productName = await screen.findByPlaceholderText(/Product Name/);
    const price = await screen.findByPlaceholderText(/Price/);
    const description = await screen.findByPlaceholderText(/Description/);
    // const tag = await screen.findByTestId(/tag-/);
    expect(productName).toHaveValue(editProductData.data.title);
    expect(price).toHaveValue(editProductData.data.price);
    expect(description).toHaveValue(editProductData.data.description);
  });

  test("All fields required validation", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );
    waitFor(async () => {
      const titleInput = await screen.findByPlaceholderText(/Product Name/);
      const priceInput = await screen.findByRole("spinbutton", {
        name: /price/i,
      });
      const descInput = await screen.findByPlaceholderText(
        /Product Description/
      );
      const tagInput = await screen.findByTestId(/tag-/);
      fireEvent.change(titleInput, { target: { value: "" } });
      fireEvent.change(priceInput, { target: { value: "" } });
      fireEvent.change(descInput, {
        target: { value: "" },
      });
      fireEvent.change(tagInput, { target: { value: "" } });
      const form = await screen.findByTestId("productForm");
      fireEvent.submit(form);
      const productError = await screen.findByText(/Product name is required/);
      const priceError = await screen.findByText(/Price is required/);
      const descError = await screen.findByText(/Description is required/);
      const tagError = await screen.findByText(/Tag is required/);

      expect(productError).toBeInTheDocument();
      expect(priceError).toBeInTheDocument();
      expect(descError).toBeInTheDocument();
      expect(tagError).toBeInTheDocument();
    });
  });

  test("Price number format validation", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );
    const priceInput = screen.getByRole("spinbutton", { name: /price/i });
    fireEvent.change(priceInput, { target: { value: "-1" } });
    const form = screen.getByTestId("productForm");
    fireEvent.submit(form);
    const priceError = await screen.findByText(/Price should be more than 0/);
    expect(priceError).toBeInTheDocument();
  });

  test("Add new tag", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );
    waitFor(async () => {
      const addBtn = screen.getByTestId("add-btn");
      fireEvent.click(addBtn);
      fireEvent.click(addBtn);
      fireEvent.click(addBtn);
      const tagInputs = await screen.findAllByTestId(/tag/);
      expect(tagInputs.length).toEqual(4);
    });
  });

  test("Delete tag", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <EditProduct />
      </QueryClientProvider>
    );

    waitFor(async () => {
      // Total 5 tags (1 initial and 4 added)
      const addBtn = screen.getByTestId("add-btn");
      fireEvent.click(addBtn);
      fireEvent.click(addBtn);
      fireEvent.click(addBtn);
      fireEvent.click(addBtn);

      let tagInputs = await screen.findAllByTestId(/^tag-/);

      console.log("After add: ", tagInputs.length);
      // Delete 2 tags
      const deleteBtn1 = screen.getByTestId("del-btn-1");
      const deleteBtn2 = screen.getByTestId("del-btn-2");
      fireEvent.click(deleteBtn2);
      fireEvent.click(deleteBtn1);
      tagInputs = await screen.findAllByTestId(/tag-/);
      expect(tagInputs).toHaveLength(3);
    });
  });
});

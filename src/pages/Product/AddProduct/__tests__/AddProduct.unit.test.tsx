import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddProduct } from "../AddProduct";
import { QueryClient, QueryClientProvider } from "react-query";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("Add Product", () => {
  test("Render all fields correctly", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <AddProduct />
      </QueryClientProvider>
    );
    const productName = await screen.findByPlaceholderText(/Product Name/);
    const price = await screen.findByLabelText(/Price/);
    const description = await screen.findByLabelText(/Description/);
    const tag = await screen.findByTestId(/tag-/);
    expect(productName).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });

  test("All fields required validation", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <AddProduct />
      </QueryClientProvider>
    );
    waitFor(() => {
      const form = screen.getByTestId("productForm");
      fireEvent.submit(form);
      expect(screen.getByText(/Product name is required/)).toBeInTheDocument();
      expect(screen.getByText(/Price is required/)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/)).toBeInTheDocument();
      expect(screen.getByText(/Tag is required/)).toBeInTheDocument();
    });
  });

  test("Price number format validation", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <AddProduct />
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
        <AddProduct />
      </QueryClientProvider>
    );
    const addBtn = screen.getByTestId("add-btn");
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    const tagInputs = await screen.findAllByTestId(/tag/);
    expect(tagInputs.length).toEqual(4);
  });

  test("Delete tag", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <AddProduct />
      </QueryClientProvider>
    );

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

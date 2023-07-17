import { render, screen } from "@testing-library/react";
import { ProductsList } from "../ProductsList";
import { QueryClient, QueryClientProvider } from "react-query";
import { vi } from "vitest";

const queryclient = new QueryClient();

beforeEach(() => {
  vi.mock("react-query", async () => ({
    ...(await vi.importActual<typeof import("react-query")>("react-query")),
    useQuery: () => {
      return {
        isSuccess: false,
        isError: false,
        isLoading: true,
        data: null,
        error: null,
      };
      // console.log("beforeEach: ", expect.getState());
      /* const testName = expect
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
      } */
    },
    useLocation: () => vi.fn(),
  }));
});

describe("Products List", () => {
  /* Initial page load should display loader */
  test("Check loader", async () => {
    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );
    const element = await screen.findByTestId("loader");
    expect(element).toBeInTheDocument();
  });

  test("Add product button is present", async () => {
    // vi.mock("react-router-dom", async () => {
    //   return {
    //     ...vi.importActual("react-router-dom"),
    //     NavLink: ({
    //       children,
    //       to,
    //       className,
    //       dataTestId,
    //     }: {
    //       children: JSX.Element;
    //       to: string;
    //       className: string;
    //       dataTestId: string;
    //     }) =>
    //       React.createElement(
    //         "a",
    //         { href: to, className, "data-testid": dataTestId },
    //         children
    //       ),
    //   };
    // });

    render(
      <QueryClientProvider client={queryclient}>
        <ProductsList />
      </QueryClientProvider>
    );

    const addBtn = await screen.findByText(/Add Product/);
    expect(addBtn).toBeInTheDocument();
  });
});

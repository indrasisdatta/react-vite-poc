import { AppRouter } from "./AppRouter";
import { BrowserRouter, NavLink, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryclient = new QueryClient();

export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
        <header className="bg-black">
          <nav className="mx-auto flex justify-content-between p-3 lg:px-8">
            <div className="flex items-center flex-shrink-0 text-white mr-6 hover:bg-gray-700">
              <NavLink to="/" className="text-white">
                Vite App
              </NavLink>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <div className="text-sm lg:flex-grow">
                <NavLink
                  to="product"
                  className="block mt-1 md:mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4"
                >
                  Product
                </NavLink>
              </div>
            </div>
          </nav>
        </header>
        <AppRouter />
        <Outlet />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

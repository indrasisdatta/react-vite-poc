import { AppRouter } from "./AppRouter";
import { BrowserRouter, NavLink, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { ThemeSwitch } from "./common/components/ThemeSwitch";

const queryclient = new QueryClient();

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryclient}>
          <header className="bg-white dark:bg-dark border-b-[1px] border-gray-300">
            <nav className="mx-auto flex justify-content-between p-3 lg:px-8">
              <div className="flex items-center flex-shrink-0 text-black dark:text-white mr-6 hover:bg-gray-700">
                <NavLink
                  to="/"
                  className="text-indigo-600 font-bold dark:text-white"
                >
                  Vite App
                </NavLink>
              </div>
              <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                  <NavLink
                    to="product"
                    className="block mt-1 md:mt-4 lg:inline-block lg:mt-0 text-indigo-700 dark:text-teal-100 dark:hover:text-white mr-4"
                  >
                    Product
                  </NavLink>
                </div>
              </div>
              <div>
                <ThemeSwitch />
              </div>
            </nav>
          </header>
          <AppRouter />
          {/* <Outlet /> */}
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

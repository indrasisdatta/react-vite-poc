import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "./common/components/Loader";
import { PageLoader } from "./common/components/PageLoader";
import { EditProduct } from "./pages/Product/EditProduct";
// import { AddProduct } from "./pages/Product/AddProduct";
// import ProductsList from "./pages/Product/ProductsList";
// import { Dashboard } from "./pages/Dashboard";

// const Dashboard = lazy(() => import("./pages/Dashboard"));

const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => {
    // console.log("Dashboard module", module);
    return { default: module.Dashboard };
  })
);
const ProductsList = lazy(() =>
  import("./pages/Product/ProductsList").then((module) => {
    // console.log("ProductsList module", module);
    return {
      default: module.ProductsList,
    };
  })
);
const AddProduct = lazy(() =>
  import("./pages/Product/AddProduct").then((module) => ({
    default: module.AddProduct,
  }))
);

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route path="product">
        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductsList />
            </Suspense>
          }
          index
        />
        <Route
          path="add"
          element={
            <Suspense fallback={<PageLoader />}>
              <AddProduct />
            </Suspense>
          }
        />
        <Route
          path=":prodId"
          element={
            <Suspense fallback={<PageLoader />}>
              <EditProduct />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

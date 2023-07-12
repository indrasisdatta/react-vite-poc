import { useQuery } from "react-query";
import { NavLink, useLocation } from "react-router-dom";
import { Product } from "../../models/Product";
import { currencyFormat } from "../../utils/helpers";
import { Loader } from "../../common/components/Loader";
import { getProducts } from "../../api/ApiService";
import { SuccessAlert } from "../../common/SuccessAlert";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";

export const ProductsList: React.FC = () => {
  const location = useLocation();

  const [isOpenErrAlert, setIsOpenErrAlert] = useState(true);

  console.log("Location: ", location);

  const fetchProducts = async () => {
    const { data } = await getProducts();
    return data;
  };

  const { isSuccess, isError, isLoading, data, error } = useQuery(
    "products",
    fetchProducts
  );

  console.log("Check Products", isSuccess, isError, isLoading, data, error);
  console.log("Products: ", data);

  return (
    <div className="container mx-auto p-8">
      <div className="md:flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Products List</h1>
        {location.state && location.state.addSuccess && (
          <SuccessAlert
            className="mb-4 md:w-6/12"
            successMsg="New product added."
            isOpen={isOpenErrAlert}
            setIsOpen={setIsOpenErrAlert}
          />
        )}
        <NavLink to={"/product/add"}>
          <button
            type="button"
            className="w-full rounded-md block bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </NavLink>
      </div>
      <div>
        <table className="md:w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                Title
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                Category
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                Brand
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                Price
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody data-testid="product-table">
            {isError ? (
              <tr>
                <td className="text-center p-12" colSpan={5}>
                  Error fetching records{" "}
                  {(error as Error)?.message as React.ReactNode}
                </td>
              </tr>
            ) : null}
            {isLoading ? (
              <tr data-testid="loader">
                <td className="text-center" colSpan={5}>
                  <Loader className="mt-14" />
                </td>
              </tr>
            ) : null}
            {isSuccess
              ? data?.products?.map((product: Product) => (
                  <tr key={product.id} className="even:bg-blue-gray-50/50">
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{currencyFormat(product.price)}</td>
                    <td className="text-right w-5">
                      <NavLink
                        to={`/product/${product.id}`}
                        className="text-right"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </NavLink>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

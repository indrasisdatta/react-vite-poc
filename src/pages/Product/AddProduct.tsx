import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useMutation } from "react-query";
import { addProduct } from "../../api/ApiService";
import { ErrorAlert } from "../../common/components/ErrorAlert";
import { Loader } from "../../common/components/Loader";
import { useNavigate } from "react-router-dom";

type FormValues = {
  title: string;
  price: number;
  description: string;
  tags: [{ tag: string }];
};

interface Error {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any;
}

export const AddProduct: React.FC = () => {
  const [isOpenSucAlert, setIsOpenSucAlert] = useState(true);
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      tags: [{ tag: "" }],
    },
  });
  const { errors } = formState;
  console.log("Form state", formState);

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });
  console.log("fieldArr", fields);

  const saveProduct = async (formData: FormValues) => {
    const { data } = await addProduct(formData);
    return data;
  };

  const {
    mutate: addMutation,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useMutation(saveProduct);

  const navigate = useNavigate();

  const onSubmit = (formData: FormValues) => {
    console.log("Form submitted", formData);
    addMutation(formData);
  };

  const hasError = (field: string) => {
    return errors && field in errors;
    // && (errors as Error)[field].message;
  };

  const getInputClass = (field: string) => {
    let commonClasses = `w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus-within:rounded-md focus-within:ring-1 focus-within:ring-inset focus-visible:outline-none `;
    if (hasError(field)) {
      commonClasses += `focus-within:ring-red-800`;
    } else {
      commonClasses += `focus-within:ring-blue-800`;
    }
    return commonClasses;
  };

  const getInputDivClass = (field: string) => {
    let classes = `rounded-md shadow-sm ring-1 ring-inset focus:outline-0 `;

    switch (field) {
      case "title":
        classes += `flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-sm `;
        break;
      case "price":
        classes = `flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-sm `;
        break;
      case "tags":
        classes = `flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs `;
        break;
      case "description":
        classes += `sm:max-w-full `;
    }
    if (hasError(field)) {
      classes += "ring-red-600";
    } else {
      classes += "ring-gray-300";
    }
    return classes;
  };
  // console.log("Mutation check", { isLoading, isError, error });

  if (isSuccess) {
    navigate("/product", { state: { addSuccess: true } });
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {isError && (
        <ErrorAlert
          errorMsg={(error as Error)?.message}
          className="md:flex mb-4 md:w-9/12"
          isOpen={isOpenSucAlert}
          setIsOpen={setIsOpenSucAlert}
        />
      )}
      {isLoading && <Loader className="m-auto mt-3" />}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* <div className="mt-3 grid grid-cols-2 gap-4"> */}
        <div className="md:flex mb-4">
          <div className="w-full md:w-1/2 ">
            <label
              htmlFor="title"
              className={`block text-sm font-medium leading-6 ${
                hasError("title") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Product Name
            </label>
            <div className="mt-1">
              <div className={getInputDivClass("title")}>
                <input
                  type="text"
                  id="title"
                  className={getInputClass("title")}
                  placeholder="Product Name"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Product name is required",
                    },
                    validate: {
                      notSupported: (fieldValue) => {
                        console.log(
                          "Custom validation notsupported",
                          fieldValue
                        );
                        return fieldValue !== "test" || "Invalid product";
                      },
                    },
                  })}
                />
              </div>
              {errors && (errors as Error)?.title?.message && (
                <span className="inline-flex text-sm text-red-700">
                  {(errors as Error)?.title.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full md:w-3/12">
            <label
              htmlFor="price"
              className={`block text-sm font-medium leading-6 ${
                hasError("price") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Price
            </label>
            <div className="mt-1">
              <div className={getInputDivClass("price")}>
                <span
                  className={`px-4 py-1 bg-gray-200 border rounded-l-md ${
                    hasError("price")
                      ? "text-red-600 border-red-600"
                      : "text-gray-900 "
                  }`}
                >
                  $
                </span>
                <input
                  type="number"
                  id="price"
                  className={getInputClass("price")}
                  placeholder="Price"
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Price is required",
                    },
                    pattern: {
                      value: /^[1-9]\d*(\.\d+)?$/,
                      message: "Price is invalid",
                    },
                    min: {
                      value: 0.1,
                      message: "Price should be more than 0",
                    },
                  })}
                />
              </div>
              {errors && (errors as Error)?.price?.message && (
                <span className="inline-flex text-sm text-red-700">
                  {(errors as Error)?.price?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-full">
            <label
              className={`block text-sm font-medium leading-6 ${
                hasError("description") ? "text-red-600" : "text-gray-900"
              }`}
            >
              Description
            </label>
            <div className="mt-1">
              <div className={`${getInputDivClass("description")} sm:w-9/12`}>
                <textarea
                  // name="description"
                  id="description"
                  //className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  className={`${getInputClass("description")}`}
                  placeholder="Product Description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  })}
                />
              </div>
              {errors && (errors as Error)?.description?.message && (
                <span className="inline-flex text-sm text-red-700">
                  {(errors as Error)?.description?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 ">
          <div
            className={`flex justify-between text-sm font-medium leading-6 ${
              hasError("tags") ? "text-red-600" : "text-gray-900"
            }`}
          >
            <label>Tags</label>
          </div>

          <div className="mt-1">
            {fields.map((field, index) => (
              <>
                <div
                  key={field.id}
                  className={`mb-2 ${getInputDivClass("tags")}`}
                >
                  <input
                    key={field.id}
                    type="text"
                    className={getInputClass("tags")}
                    placeholder="Enter Tag"
                    {...register(`tags.${index}.tag` as any, {
                      required: {
                        value: true,
                        message: "Tag is required",
                      },
                    })}
                  />
                  {index === 0 && (
                    <button
                      type="button"
                      className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => append({ tag: "" })}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {errors &&
                  (errors as Error)?.tags?.length > 0 &&
                  (errors as Error)?.tags[index].tag?.message && (
                    <span className="inline-flex text-sm text-red-700">
                      {(errors as Error)?.tags[index].tag[index]?.message}
                    </span>
                  )}
              </>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-x-6">
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-md block bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

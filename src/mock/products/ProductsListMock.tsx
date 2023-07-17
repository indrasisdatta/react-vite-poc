export const loadedSuccess = {
  isSuccess: true,
  isError: false,
  isLoading: false,
  data: {
    products: [
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        brand: "Brand 1",
        price: 10,
      },
      {
        id: 2,
        title: "Product 2",
        category: "Category 2",
        brand: "Brand 2",
        price: 20,
      },
    ],
  },
  error: null,
};

export const loadedError = {
  isSuccess: false,
  isError: true,
  isLoading: false,
  error: {
    message: "404 URL",
  },
  data: null,
};

export const editProductData = {
  isError: false,
  isLoading: false,
  data: {
    id: 2,
    title: "iPhone X",
    description: "iPhone X is awesome",
    price: 59999,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
  },
};

export const editProductDataIT = {
  isError: false,
  isLoading: false,
  data: {
    id: 4,
    title: "iPhone X",
    description: "iPhone X is awesome",
    price: 59999,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
  },
};

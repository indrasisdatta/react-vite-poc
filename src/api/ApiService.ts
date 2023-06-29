import { Product } from "../models/Product";
import { axios } from "./axios";

export const getProducts = async () => {
    return await axios.get("products");
}

export const getProduct = async (productId: string | undefined) => {
    return await axios.get(`products/${productId}`);
}

export const addProduct = async (data: Product) => {
    return await axios.post('products/add', data)
}

export const updateProduct = async (data: Product) => {
    return await axios.put(`product/${data.id}`, data)
}
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Cart and Product types
export type CartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
};

export type Cart = {
    id: number;
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
};

export type CartApiResponse = {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
};

const fetchCarts = async (): Promise<CartApiResponse> => {
    const { data } = await axios.get("http://dummyjson.com/carts");
    return data;
};

export const CartList: React.FC = () => {
    const { data, isLoading, isError, error } = useQuery<CartApiResponse, Error>({
        queryKey: ["carts"],
        queryFn: fetchCarts,
    });

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Cart List</h1>
            {isLoading && <div className="text-center">Loading...</div>}
            {isError && (
                <div className="text-red-600 text-center">Error: {error?.message}</div>
            )}
            {data && (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Cart ID</th>
                                <th className="p-2 border">User ID</th>
                                <th className="p-2 border">Total Products</th>
                                <th className="p-2 border">Total Quantity</th>
                                <th className="p-2 border">Total</th>
                                <th className="p-2 border">Discounted Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.carts.map((cart) => (
                                <tr key={cart.id} className="even:bg-gray-50">
                                    <td className="p-2 border text-center">{cart.id}</td>
                                    <td className="p-2 border text-center">{cart.userId}</td>
                                    <td className="p-2 border text-center">{cart.totalProducts}</td>
                                    <td className="p-2 border text-center">{cart.totalQuantity}</td>
                                    <td className="p-2 border text-center">${cart.total}</td>
                                    <td className="p-2 border text-center">${cart.discountedTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CartList;

import { rest } from "msw";

// https://github.com/mswjs/msw/discussions/783
export const handlers = [
    /* Product listing */
    rest.get('https://dummyjson.com/products', async (_req, res, ctx) => {
        const productsListSuccess = await import("./products/products-list-success.json");
        return res(
            ctx.status(200),
            ctx.json(productsListSuccess)
        )
    }),
    /* Product edit */
    rest.get('https://dummyjson.com/products/null', async (_req, res, ctx) => {
        const { editProductData } = await import("./products/ProductsListMock");
        return res(
            ctx.status(200),
            ctx.json(editProductData.data)
        )
    })
]
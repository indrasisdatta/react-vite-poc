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
    /* Product edit (integration testing) - populate product inputs */
    rest.get('https://dummyjson.com/products/4', async (_req, res, ctx) => {
        const { editProductDataIT } = await import("./products/ProductsListMock");
        return res(
            ctx.status(200),
            ctx.json(editProductDataIT.data)
        )
    }),
    /* Product edit (Unit test) - populate product inputs */
    rest.get('https://dummyjson.com/products/null', async (_req, res, ctx) => {
        const { editProductData } = await import("./products/ProductsListMock");
        return res(
            ctx.status(200),
            ctx.json(editProductData.data)
        )
    }),
    /* Product add */
    rest.post('https://dummyjson.com/products/add', async (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(_req)
        )
    }),
    /* Product update */
    rest.put('https://dummyjson.com/product/4', async (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(_req)
        )
    }),
   
]
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import { mockedFunctions } from "../src/mockFunctions";
import { server } from "../src/mock/server";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

vi.mock('react-router-dom', async() => {
    return {
        ...vi.importActual('react-router-dom'),
        ...mockedFunctions
    }
})

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    server.resetHandlers();
})

afterAll(() => {
    server.close();
});
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, expect, vi } from "vitest";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

vi.mock('react-router-dom', async() => {
    return {
        ...vi.importActual('react-router-dom'),
        useLocation: () => ({
            state: null,
            addSuccess: null
        }),
        useHistory: vi.fn(),
        useParams: vi.fn(),
        matchPath: vi.fn(),
        withRouter: vi.fn(),
        useRouteMatch: vi.fn(),
        Link: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        NavLink: ({ children, to }: { children: JSX.Element; to: string }) =>
          React.createElement('a', { href: to }, children),
        Router: () => vi.fn(),
        HashRouter: () => vi.fn(),
        Switch: () => vi.fn(),
    }
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
})
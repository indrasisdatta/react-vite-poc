import React from "react";
import { vi } from "vitest";

export const mockedFunctions = {
    useLocation: () => ({
      state: { addSuccess: null }
    }),
    useHistory: vi.fn(),
    useParams: vi.fn(),
    useNavigate: vi.fn(),
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
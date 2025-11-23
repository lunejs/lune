import '@testing-library/jest-dom';

import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

vi.mock('@/lib/api/fetchers/gql-fetcher', () => ({
  gqlFetcher: vi.fn()
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn()
}));

beforeEach(() => {
  vi.clearAllMocks();
});

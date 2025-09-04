import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

import { gqlFetcher } from '@/lib/api/fetchers/gql-fetcher';

import { setCookie } from '@/lib/shared/cookies';

import { render } from '@/tests/render';
import {
  INVALID_CREDENTIALS_USER_ACCESS_TOKEN_RESPONSE,
  SUCCESS_GENERATE_USER_ACCESS_TOKEN_RESPONSE
} from './login-form.mock';

import { LoginForm } from '../login-form';

vi.mock('@/lib/shared/cookies', () => ({
  setCookie: vi.fn()
}));

const gqlFetcherMock = gqlFetcher as ReturnType<typeof vi.fn>;
const navigateMock = useNavigate as ReturnType<typeof vi.fn>;

describe('Login Form', () => {
  test('set cookie and navigate to "/" on successful login', async () => {
    const navigateSpy = vi.fn();
    navigateMock.mockReturnValue(navigateSpy);

    gqlFetcherMock.mockResolvedValueOnce(SUCCESS_GENERATE_USER_ACCESS_TOKEN_RESPONSE);

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secure123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith('x-user-vendyx-token', 'mocked-token', { expires: 7 });
      expect(navigateSpy).toHaveBeenCalledWith('/shops');
    });
  });

  test('renders error notification on INVALID_CREDENTIALS error', async () => {
    const navigateSpy = vi.fn();
    navigateMock.mockReturnValue(navigateSpy);

    gqlFetcherMock.mockResolvedValueOnce(INVALID_CREDENTIALS_USER_ACCESS_TOKEN_RESPONSE);

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText(/m@example\.com/i), 'fail@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong password');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
  });

  test('renders error notification on generic error', async () => {
    const navigateSpy = vi.fn();
    navigateMock.mockReturnValue(navigateSpy);

    gqlFetcherMock.mockRejectedValueOnce(new Error('Network Error'));

    render(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secure123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    expect(navigateSpy).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
  });
});

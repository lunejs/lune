import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

import { gqlFetcher } from '@/lib/api/fetchers/gql-fetcher';
import { setCookie } from '@/shared/cookies';
import { render } from '@/tests/render';

import { CreateShopForm } from '../create-shop-form';

import {
  EMAIL_ALREADY_EXISTS_CREATE_SHOP_RESPONSE,
  SUCCESS_CREATE_SHOP_RESPONSE
} from './create-shop-form.mock';

vi.mock('@/shared/cookies', () => ({
  setCookie: vi.fn()
}));

const gqlFetcherMock = gqlFetcher as ReturnType<typeof vi.fn>;
const navigateMock = useNavigate as ReturnType<typeof vi.fn>;

describe('Create Shop Form Component', () => {
  test('redirects to dashboard on successful shop creation', async () => {
    const navigateSpy = vi.fn();
    navigateMock.mockReturnValue(navigateSpy);

    gqlFetcherMock.mockResolvedValueOnce(SUCCESS_CREATE_SHOP_RESPONSE);

    render(<CreateShopForm />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Acme Store');
    await userEvent.type(screen.getByLabelText(/Email/i), 'acme@example.com');
    await userEvent.type(screen.getByLabelText(/Phone number/i), '6671624203');

    await userEvent.click(screen.getByRole('button', { name: /Create shop/i }));

    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith(
        'x-active-shop-lune',
        SUCCESS_CREATE_SHOP_RESPONSE.createShop.shop.id,
        { expires: 30 }
      );
      expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('renders EMAIL_ALREADY_EXISTS error', async () => {
    gqlFetcherMock.mockResolvedValueOnce(EMAIL_ALREADY_EXISTS_CREATE_SHOP_RESPONSE);

    render(<CreateShopForm />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Acme Store');
    await userEvent.type(screen.getByLabelText(/Email/i), 'acme@example.com');
    await userEvent.type(screen.getByLabelText(/Phone number/i), '6671624203');

    await userEvent.click(screen.getByRole('button', { name: /Create shop/i }));

    expect(screen.getByText(/Email already exists for a shop/i)).toBeInTheDocument();
  });
});

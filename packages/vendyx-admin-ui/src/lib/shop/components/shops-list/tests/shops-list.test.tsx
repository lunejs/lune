import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router';

import { setCookie } from '@/lib/shared/cookies';

import { render } from '@/tests/render';
import { SHOPS_MOCK } from './shops-list.mock';

import { ShopsList } from '../shops-list';

vi.mock('@/lib/shared/cookies', () => ({
  setCookie: vi.fn()
}));

const navigateMock = useNavigate as ReturnType<typeof vi.fn>;

describe('ShopsList Component', () => {
  test('select shop and redirect to dashboard on click', async () => {
    const navigateSpy = vi.fn();
    navigateMock.mockReturnValue(navigateSpy);

    render(<ShopsList shops={SHOPS_MOCK} isLoading={false} />);

    const acmeShopButton = screen.getByRole('button', { name: /Select Acme Shop/i });

    expect(acmeShopButton).toBeInTheDocument();

    await userEvent.click(acmeShopButton);

    expect(setCookie).toHaveBeenCalledWith('x-active-shop-vendyx', '1', { expires: 30 });
    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
  });

  test('renders loading state when isLoading prop is true', () => {
    render(<ShopsList shops={[]} isLoading={true} />);

    const loadingSpinner = screen.getByRole('status');

    expect(loadingSpinner).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { render } from '@/tests/render';

import { ProductDetails } from '../product-details';

describe('ProductDetails', () => {
  describe('Create', () => {
    describe('Variants', () => {
      describe('Option', () => {
        test('renders empty state as initial state', () => {
          render(<ProductDetails />);

          expect(screen.getByRole('button', { name: /Add options/i })).toBeInTheDocument();
        });

        test('renders create option form when clicking on add options button', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });

          await userEvent.click(button);

          expect(screen.queryByRole('button', { name: /Add options/i })).not.toBeInTheDocument();

          expect(screen.getByText(/Option name/i)).toBeInTheDocument();
          expect(screen.getByText(/Values/i)).toBeInTheDocument();
        });

        test('renders Add option button until 3 options are added', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });

          await userEvent.click(button);

          const addOptionButton = screen.getByRole('button', { name: /Add option/i });

          await userEvent.click(addOptionButton);
          expect(addOptionButton).toBeInTheDocument();

          await userEvent.click(addOptionButton);
          expect(addOptionButton).not.toBeInTheDocument();
        });

        test('renders Add option button again if one option is removed', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });

          await userEvent.click(button);

          const addOptionButton = screen.getByRole('button', { name: /Add option/i });

          await userEvent.click(addOptionButton);
          await userEvent.click(addOptionButton);

          const [removeButton] = screen.getAllByRole('button', { name: /Remove/i });

          await userEvent.click(removeButton);

          expect(screen.getByRole('button', { name: /Add option/i })).toBeInTheDocument();
        });

        test('renders one input more than the option values filled', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(button);

          const input = screen.getByRole('textbox', { name: /option value 0/i });
          await userEvent.type(input, 'XS');

          const newInput = screen.getByRole('textbox', { name: /option value 1/i });
          await userEvent.type(newInput, 'S');

          expect(screen.getByRole('textbox', { name: /option value 2/i })).toBeInTheDocument();
        });

        test('renders error when any option value is repeated', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(button);

          const input = screen.getByRole('textbox', { name: /option value 0/i });
          await userEvent.type(input, 'XS');

          const newInput = screen.getByRole('textbox', { name: /option value 1/i });
          await userEvent.type(newInput, 'XS');

          expect(
            screen.getByText(/Already exists an option value called "XS"/i)
          ).toBeInTheDocument();
          expect(screen.getByRole('textbox', { name: /option value 2/i })).toBeInTheDocument();
        });

        test('removes option value when clicking on trash icon button', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(button);

          const input = screen.getByRole('textbox', { name: /option value 0/i });
          await userEvent.type(input, 'XS');

          const newInput = screen.getByRole('textbox', { name: /option value 1/i });
          await userEvent.type(newInput, 'S');

          const removeButton = screen.getByRole('button', { name: /Remove option value "S"/i });
          await userEvent.click(removeButton);

          expect(removeButton).not.toBeInTheDocument();
        });
      });

      describe('Variants list', () => {
        test('renders variants list created from 1 option', async () => {
          render(<ProductDetails />);

          const button = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(button);

          const optionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(optionNameInput, 'Size');

          const getValueInput = (i: number) =>
            screen.getByRole('textbox', { name: `option value ${i}` });

          await userEvent.type(getValueInput(0), 'XS');
          await userEvent.type(getValueInput(1), 'S');
          await userEvent.type(getValueInput(2), 'M');
          await userEvent.type(getValueInput(3), 'L');
          await userEvent.type(getValueInput(4), 'XL');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          expect(screen.getByRole('button', { name: /^XS$/i }));
          expect(screen.getByRole('button', { name: /^S$/i }));
          expect(screen.getByRole('button', { name: /^M$/i }));
          expect(screen.getByRole('button', { name: /^L$/i }));
          expect(screen.getByRole('button', { name: /^XL$/i }));
        });

        test('renders variants list created from 2 options', async () => {
          render(<ProductDetails />);

          // Create first option: Size
          const addOptionsButton = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(addOptionsButton);

          const optionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(optionNameInput, 'Size');

          const getValueInput = (i: number) =>
            screen.getByRole('textbox', { name: `option value ${i}` });

          await userEvent.type(getValueInput(0), 'S');
          await userEvent.type(getValueInput(1), 'M');
          await userEvent.type(getValueInput(2), 'L');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          // Create second option: Color
          const addOptionButton = screen.getByRole('button', { name: /Add option/i });
          await userEvent.click(addOptionButton);

          const colorOptionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(colorOptionNameInput, 'Color');

          await userEvent.type(getValueInput(0), 'Red');
          await userEvent.type(getValueInput(1), 'Blue');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          // Should have 3 groups (S, M, L) with 2 variants each
          // First verify the groups exist using data-testid
          expect(screen.getByTestId('group-name-S')).toBeInTheDocument();
          expect(screen.getByTestId('group-name-M')).toBeInTheDocument();
          expect(screen.getByTestId('group-name-L')).toBeInTheDocument();

          // Each group should show "2 variants"
          const variantCounts = screen.getAllByText('2 variants');
          expect(variantCounts).toHaveLength(3);

          // Test all variants in all groups
          const accordionButtons = screen.getAllByRole('button', { name: /2 variants/i });

          // Open first accordion (S group) and verify its variants
          await userEvent.click(accordionButtons[0]);
          expect(screen.getByRole('button', { name: /^Red$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue$/i })).toBeInTheDocument();

          // Close first accordion and open second (M group)
          await userEvent.click(accordionButtons[0]);
          await userEvent.click(accordionButtons[1]);
          expect(screen.getByRole('button', { name: /^Red$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue$/i })).toBeInTheDocument();

          // Close second accordion and open third (L group)
          await userEvent.click(accordionButtons[1]);
          await userEvent.click(accordionButtons[2]);
          expect(screen.getByRole('button', { name: /^Red$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue$/i })).toBeInTheDocument();
        });

        test('renders variants list created from 3 options', async () => {
          render(<ProductDetails />);

          // Create first option: Size
          const addOptionsButton = screen.getByRole('button', { name: /Add options/i });
          await userEvent.click(addOptionsButton);

          let optionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(optionNameInput, 'Size');

          const getValueInput = (i: number) =>
            screen.getByRole('textbox', { name: `option value ${i}` });

          await userEvent.type(getValueInput(0), 'S');
          await userEvent.type(getValueInput(1), 'M');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          // Create second option: Color
          let addOptionButton = screen.getByRole('button', { name: /Add option/i });
          await userEvent.click(addOptionButton);

          optionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(optionNameInput, 'Color');

          await userEvent.type(getValueInput(0), 'Red');
          await userEvent.type(getValueInput(1), 'Blue');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          // Create third option: Material
          addOptionButton = screen.getByRole('button', { name: /Add option/i });
          await userEvent.click(addOptionButton);

          optionNameInput = screen.getByLabelText('Option name');
          await userEvent.type(optionNameInput, 'Material');

          await userEvent.type(getValueInput(0), 'Cotton');
          await userEvent.type(getValueInput(1), 'Polyester');

          await userEvent.click(screen.getByRole('button', { name: /Done/i }));

          // Should have 2 groups (S, M) with 4 variants each (2x2)
          // Verify the groups exist
          expect(screen.getByTestId('group-name-S')).toBeInTheDocument();
          expect(screen.getByTestId('group-name-M')).toBeInTheDocument();

          // Each group should show "4 variants"
          const variantCounts = screen.getAllByText('4 variants');
          expect(variantCounts).toHaveLength(2);

          // Test all variants in all groups
          const accordionButtons = screen.getAllByRole('button', { name: /4 variants/i });

          // Open first accordion (S group) and verify its 4 variants
          // Note: variants in groups use "/" without spaces
          await userEvent.click(accordionButtons[0]);
          expect(screen.getByRole('button', { name: /^Red\/Cotton$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Red\/Polyester$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue\/Cotton$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue\/Polyester$/i })).toBeInTheDocument();

          // Close first accordion and open second (M group)
          await userEvent.click(accordionButtons[0]);
          await userEvent.click(accordionButtons[1]);
          expect(screen.getByRole('button', { name: /^Red\/Cotton$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Red\/Polyester$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue\/Cotton$/i })).toBeInTheDocument();
          expect(screen.getByRole('button', { name: /^Blue\/Polyester$/i })).toBeInTheDocument();
        });
      });
    });
  });
});

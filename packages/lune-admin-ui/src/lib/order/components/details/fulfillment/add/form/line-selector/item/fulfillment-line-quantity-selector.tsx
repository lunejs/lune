import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button, ButtonGroup, InputGroup, InputGroupAddon, InputGroupInput } from '@lunejs/ui';

export const FulfillmentLineQuantitySelector = ({ remainingQuantity, onChange }: Props) => {
  const [quantity, setQuantity] = useState(remainingQuantity);

  useEffect(() => {
    onChange(quantity);
  }, [quantity]);

  return (
    <ButtonGroup
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <InputGroup className="w-17! h-8">
        <InputGroupInput
          className=""
          maxLength={2}
          value={quantity}
          onChange={e => {
            if (e.target.value === '') setQuantity(0);

            const value = parseInt(e.target.value, 10);

            if (!isNaN(value) && value >= 1 && value <= 99) {
              if (value > remainingQuantity) return;
              setQuantity(value);
            }
          }}
        />
        <InputGroupAddon align={'inline-end'}>of {remainingQuantity}</InputGroupAddon>
      </InputGroup>
      <Button
        variant="outline"
        size="icon"
        type="button"
        aria-label="Decrement"
        className="size-8"
        disabled={quantity === 1}
        onClick={() => {
          setQuantity(prev => prev - 1);
        }}
      >
        <MinusIcon />
      </Button>
      <Button
        variant="outline"
        type="button"
        aria-label="Increment"
        className="size-8"
        disabled={quantity >= remainingQuantity}
        onClick={() => {
          setQuantity(prev => prev + 1);
        }}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

type Props = {
  remainingQuantity: number;
  onChange: (quantity: number) => void;
};

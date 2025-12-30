import { useState } from 'react';
import { EyeClosedIcon, EyeIcon, type LucideIcon } from 'lucide-react';

import { Button, Muted, Small } from '@lunejs/ui';

export const ShopSecretField = ({ icon: Icon, label, value }: Props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className="group p-4 border-t flex items-center justify-between gap-4 transition-colors">
      <div className="flex items-center gap-3">
        <Icon size={20} />

        <div>
          <Small>{label}</Small>
          {isHidden ? <Muted>********************</Muted> : <Muted>{value}</Muted>}
        </div>
      </div>
      <Button size={'icon'} variant={'ghost'} onClick={() => setIsHidden(prev => !prev)}>
        {isHidden ? <EyeClosedIcon /> : <EyeIcon />}
      </Button>
    </div>
  );
};

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
};

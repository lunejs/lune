import { Hr, Text } from '@react-email/components';
import type { ReactNode } from 'react';

export const EmailFooter = ({ children }: Props) => {
  return (
    <>
      <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
      <Text className="text-[#6a737d] text-xs leading-[24px] text-center mb-4">{children}</Text>
    </>
  );
};

type Props = {
  children: ReactNode;
};

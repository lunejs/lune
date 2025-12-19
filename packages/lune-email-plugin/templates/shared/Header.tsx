import { Button, Heading, Img, Section, Text } from '@react-email/components';
import { ComponentProps } from 'react';

type EmailHeaderProps = ComponentProps<'table'>;

export const EmailHeader = ({ ...props }: EmailHeaderProps) => {
  return <Section {...props} />;
};

type EmailHeaderThumbnailProps = ComponentProps<'p'>;

export const EmailHeaderThumbnail = ({
  className,
  ...props
}: EmailHeaderSubtitleProps) => {
  return (
    <Text {...props} className={'text-[14px] text-[#737373] ' + className} />
  );
};

type EmailHeaderImageProps = ComponentProps<'img'>;

export const EmailHeaderImage = ({ ...props }: EmailHeaderImageProps) => {
  return <Img {...props} />;
};

type EmailHeaderTitleProps = ComponentProps<'h1'>;

export const EmailHeaderTitle = ({
  className,
  ...props
}: EmailHeaderTitleProps) => {
  return (
    <Heading
      {...props}
      className={'font-normal text-[24px] text-black !mb-0 ' + className}
    />
  );
};

type EmailHeaderSubtitleProps = ComponentProps<'p'>;

export const EmailHeaderSubtitle = ({
  className,
  ...props
}: EmailHeaderSubtitleProps) => {
  return (
    <Text
      {...props}
      className={'text-[14px] text-black leading-[24px] ' + className}
    />
  );
};

type EmailHeaderButtonProps = ComponentProps<'a'>;

export const EmailHeaderButton = ({
  className,
  ...props
}: EmailHeaderButtonProps) => {
  return (
    <Button
      {...props}
      className={
        'rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline ' +
        className
      }
    />
  );
};

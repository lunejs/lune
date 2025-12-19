import { clean, getFullName } from '@lune/common';
import { Customer, Shop } from '@lune/core';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
  render,
} from '@react-email/components';

const Component = ({ customer, shop }: CustomerRegisteredTemplateInput) => {
  const customerName = getFullName(clean(customer)) as string;
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans p-[32px]">
          <Preview>Welcome {customerName}</Preview>
          <Container className="mx-auto max-w-[500px] w-full">
            <Section>
              <Img
                src={shop.logo as string}
                width="40"
                height="37"
                alt={shop.name}
              />
            </Section>
            <Section>
              <Heading className="font-normal text-[24px] text-black !mb-0">
                Welcome to {shop.name}!
              </Heading>
              <Text className="text-[14px] text-black leading-[24px]">
                Hi <strong>{customerName}</strong>, next time you shop with us
                log in for faster checkout.
              </Text>
              <Button className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline">
                Visit our store
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
            <Text className="text-[#6a737d] text-xs leading-[24px] text-center mb-4">
              {shop.name} ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export type CustomerRegisteredTemplateInput = {
  shop: Shop;
  customer: Customer;
};

Component.PreviewProps = {
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jhondoe@gmail.com',
    id: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  shop: {
    name: 'Acme',
    logo: 'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1766093488/yhvbtqvleoexe82d4twm.png',
  },
} as CustomerRegisteredTemplateInput;

export default Component;

export const createCustomerRegisteredMail = (
  input: CustomerRegisteredTemplateInput
) => render(<Component {...input} />);

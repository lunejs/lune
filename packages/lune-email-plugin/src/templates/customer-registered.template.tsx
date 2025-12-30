import {
  Body,
  Container,
  Head,
  Html,
  pixelBasedPreset,
  Preview,
  render,
  Tailwind
} from '@react-email/components';

import { clean, getFullName } from '@lunejs/common';
import type { Customer, Shop } from '@lunejs/core';

import { EmailFooter } from './shared/Footer';
import {
  EmailHeader,
  EmailHeaderButton,
  EmailHeaderImage,
  EmailHeaderSubtitle,
  EmailHeaderTitle
} from './shared/Header';

const Component = ({ customer, shop }: CustomerRegisteredTemplateInput) => {
  const customerName = getFullName(clean(customer)) as string;
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset]
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans p-[32px]">
          <Preview>Welcome {customerName}</Preview>
          <Container className="mx-auto max-w-[500px] w-full">
            <EmailHeader>
              <EmailHeaderImage src={shop.logo as string} width="40" height="37" alt={shop.name} />
              <EmailHeaderTitle>Welcome to {shop.name}!</EmailHeaderTitle>
              <EmailHeaderSubtitle>
                Hi <strong>{customerName}</strong>, next time you shop with us log in for faster
                checkout.
              </EmailHeaderSubtitle>
              <EmailHeaderButton>Visit our store</EmailHeaderButton>
            </EmailHeader>

            <EmailFooter>
              {shop.name} ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
            </EmailFooter>
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
    updatedAt: new Date()
  },
  shop: {
    name: 'Acme',
    logo: 'https://res.cloudinary.com/dnvp4s8pe/image/upload/v1766093488/yhvbtqvleoexe82d4twm.png'
  }
} as CustomerRegisteredTemplateInput;

export default Component;

export const createCustomerRegisteredMail = (input: CustomerRegisteredTemplateInput) =>
  render(<Component {...input} />);

import type { ExecutionContext } from '@/api/shared/context/types';
import type { SignUpWithCredentialsInput, UpdateCustomerInput } from '@/api/shared/types/graphql';
import type { JwtService } from '@/libs/jwt';
import { CustomerAuthProvider } from '@/persistence/entities/customer-auth-method';
import type { ID } from '@/persistence/entities/entity';
import type { CustomerAuthMethodRepository } from '@/persistence/repositories/customer-auth-method-repository';
import type { CustomerRepository } from '@/persistence/repositories/customer-repository';
import { PasswordHasher } from '@/security/hash/hash';
import { isValidEmail } from '@/utils/validators';

import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  InvalidEmailError
} from './customer.errors';

export class CustomerService {
  private jwtService: JwtService;
  private readonly repository: CustomerRepository;
  private readonly customerAuthMethodRepository: CustomerAuthMethodRepository;

  constructor(ctx: ExecutionContext) {
    this.jwtService = ctx.jwtService;
    this.repository = ctx.repositories.customer;
    this.customerAuthMethodRepository = ctx.repositories.customerAuthMethod;
  }

  async signUpWithCredentials(input: SignUpWithCredentialsInput) {
    if (!isValidEmail(input.email)) {
      return new InvalidEmailError();
    }

    const customerExists = await this.repository.findOne({ where: { email: input.email } });

    /**
     * Customer could exist without a password because we save the customer when
     * addCustomerToOrder mutation is called and we don't save the password in that case,
     * so the user can complete the registration later.
     * When trying to create an account and found a customer with the same email
     * we need to verify if the customer has password, if not is just a customer
     * who has bought and now tries to create an account.
     * If the customer found has a password, that means that some other customer
     * already has an account in the store so that is not allowed.
     */
    if (customerExists) {
      const isAlreadyRegistered = await this.customerAuthMethodRepository.findOne({
        where: { provider: CustomerAuthProvider.Credentials, customerId: customerExists.id }
      });

      if (isAlreadyRegistered) {
        return new EmailAlreadyExistsError();
      }
    }

    const customer = await this.repository.upsert({
      where: { email: input.email },
      create: { ...input, enabled: true },
      update: { ...input }
    });

    const hashedPassword = await PasswordHasher.hash(input.password);

    await this.customerAuthMethodRepository.create({
      customerId: customer.id,
      provider: CustomerAuthProvider.Credentials,
      password: hashedPassword
    });

    const accessToken = await this.jwtService.generateToken({
      sub: customer.id,
      email: customer.email,
      enabled: customer.enabled
    });

    return accessToken;
  }

  async signInWithCredentials(email: string, password: string) {
    const customer = await this.repository.findOne({ where: { email } });

    if (!customer) {
      return new InvalidCredentialsError();
    }

    if (!customer.enabled) {
      return new InvalidCredentialsError();
    }

    const credentialsAuth = await this.customerAuthMethodRepository.findOne({
      where: { customerId: customer.id, provider: CustomerAuthProvider.Credentials }
    });

    if (!credentialsAuth) {
      return new InvalidCredentialsError();
    }

    const passwordsMatch = await PasswordHasher.compare(
      password,
      credentialsAuth.password as string
    );

    if (!passwordsMatch) {
      return new InvalidCredentialsError();
    }

    const accessToken = await this.jwtService.generateToken({
      sub: customer.id,
      email: customer.email,
      enabled: customer.enabled
    });

    return accessToken;
  }

  async update(id: ID, input: UpdateCustomerInput) {
    if (input.email) {
      if (!isValidEmail(input.email)) {
        return new InvalidEmailError();
      }

      const customerWithSameEmail = await this.repository.findOne({
        where: { email: input.email }
      });

      if (customerWithSameEmail && customerWithSameEmail.id !== id) {
        return new EmailAlreadyExistsError();
      }
    }

    return await this.repository.update({
      where: { id },
      data: {
        ...input,
        email: input.email ?? undefined
      }
    });
  }
}

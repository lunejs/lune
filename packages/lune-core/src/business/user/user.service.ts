import type { ExecutionContext } from '@/api/shared/context/types';
import type { CreateUserInput, GenerateUserAccessTokenInput } from '@/api/shared/types/graphql';
import type { ID } from '@/persistence/entities/entity';
import type { UserRepository } from '@/persistence/repositories/user-repository';
import { PasswordHasher } from '@/security/hash';
import { JwtService } from '@/security/jwt/jwt';
import { isValidEmail, isValidPassword } from '@/utils/validators';

import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  InvalidEmailError,
  InvalidPasswordError
} from './user.errors';

export class UserService {
  private repository: UserRepository;

  constructor(ctx: ExecutionContext) {
    this.repository = ctx.repositories.user;
  }

  async findById(id: ID) {
    return this.repository.findById(id);
  }

  async create(input: CreateUserInput) {
    if (!isValidEmail(input.email)) {
      return new InvalidEmailError();
    }

    if (!isValidPassword(input.password)) {
      return new InvalidPasswordError();
    }

    const emailExists = await this.repository.findByEmail(input.email);

    if (emailExists) {
      return new EmailAlreadyExistsError();
    }

    const hashedPassword = await PasswordHasher.hash(input.password);

    const user = await this.repository.create({ email: input.email, password: hashedPassword });

    return user;
  }

  async generateAccessToken(input: GenerateUserAccessTokenInput) {
    const user = await this.repository.findByEmail(input.email);

    if (!user) return new InvalidCredentialsError();

    const isPasswordMatch = await PasswordHasher.compare(input.password, user.password);

    if (!isPasswordMatch) return new InvalidCredentialsError();

    const token = JwtService.generate({ email: user.email, sub: user.id });

    return token;
  }
}

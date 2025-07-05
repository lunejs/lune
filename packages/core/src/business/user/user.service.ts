import { GraphqlContext } from '@/api/shared/context/types';
import { CreateUserInput, GenerateUserAccessTokenInput } from '@/api/shared/types/graphql';
import { isValidEmail, isValidPassword } from '@/utils/validators';
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  InvalidEmailError,
  InvalidPasswordError
} from './user.errors';
import { UserRepository } from '@/persistence/repositories/user-repository';
import { PasswordService } from '@/libs/password';
import { JwtService } from '@/libs/jwt';
import { ID } from '@/persistence/entities/entity';

export class UserService {
  private repository: UserRepository;
  private jwtService: JwtService;

  constructor(ctx: GraphqlContext) {
    this.repository = ctx.repositories.user;
    this.jwtService = ctx.jwtService;
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

    const hashedPassword = await PasswordService.hash(input.password);

    const user = await this.repository.create({ email: input.email, password: hashedPassword });

    return user;
  }

  async generateAccessToken(input: GenerateUserAccessTokenInput) {
    const user = await this.repository.findByEmail(input.email);

    if (!user) return new InvalidCredentialsError();

    const isPasswordMatch = await PasswordService.compare(input.password, user.password);

    if (!isPasswordMatch) return new InvalidCredentialsError();

    const token = this.jwtService.generateToken({ email: user.email, sub: user.id });

    return token;
  }
}

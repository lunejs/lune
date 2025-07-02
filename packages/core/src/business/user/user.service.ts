import { GraphqlContext } from '@/api/shared/context/types';
import { CreateUserInput } from '@/api/shared/types/graphql';
import { isValidEmail, isValidPassword } from '@/utils/validators';
import { EmailAlreadyExistsError, InvalidEmailError, InvalidPasswordError } from './user.errors';
import { UserRepository } from '@/persistence/repositories/user.repository';

export class UserService {
  private repository: UserRepository;

  constructor(ctx: GraphqlContext) {
    this.repository = new UserRepository(ctx.trx);
  }

  async create(input: CreateUserInput) {
    if (!isValidEmail(input.email)) {
      return new InvalidEmailError();
    }

    if (!isValidPassword(input.password)) {
      return new InvalidPasswordError();
    }

    const emailExists = await this.repository.emailExists(input.email);

    if (emailExists) {
      return new EmailAlreadyExistsError();
    }

    const user = await this.repository.create({ email: input.email, password: input.password });

    return user;
  }
}

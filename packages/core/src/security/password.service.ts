import * as bcrypt from 'bcrypt';

export class PasswordService {
  /**
   * @description
   * Service for handling password hashing and comparison using bcrypt.
   *
   * @param {PasswordServiceOptions} [options] Optional configuration for the service.
   */
  constructor(private readonly options?: PasswordServiceOptions) {}

  /**
   * @description
   * Hashes a plain-text string using bcrypt. A custom or generated salt is used.
   *
   * @param str - The plain-text string to hash.
   * @returns The resulting bcrypt hash.
   *
   * @example
   * ```typescript
   * const passwordService = new PasswordService();
   * const hashedPassword = await passwordService.hash('mySecretPassword');
   * // hashedPassword will be a ready to store bcrypt hash
   * ```
   */
  async hash(str: string) {
    const salt = await this.generateSalt();

    return bcrypt.hash(str, salt);
  }

  /**
   * @description
   * Compares a plain-text string with a bcrypt hash to check if they match.
   *
   * @param str - The plain-text string to compare.
   * @param hash - The bcrypt hash to compare against.
   * @returns A boolean indicating whether the string matches the hash.
   *
   * @example
   * ```typescript
   * const isMatch = await passwordService.compare('mySecretPassword', hashedPassword);
   * // isMatch will be true if the password matches, false otherwise
   * ```
   */
  async compare(str: string, hash: string) {
    return bcrypt.compare(str, hash);
  }

  private async generateSalt() {
    return this.options?.salt ?? (await bcrypt.genSalt());
  }
}

type PasswordServiceOptions = {
  /**
   * @description
   * Optional salt string to use for hashing. If not provided, a random salt will be generated.
   */
  salt?: string;
};

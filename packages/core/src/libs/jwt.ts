import jwt from 'jsonwebtoken';

export class JwtService {
  /**
   * @description
   * Service for handling JSON Web Token (JWT) generation and verification.
   *
   * @param {Config} config Configuration object for the service
   */
  constructor(private readonly config: Config) {}

  /**
   * @description
   * Generates a JWT token with the provided payload.
   *
   * @param payload The payload to include in the token
   * @returns The generated JWT token
   *
   * @example
   * ```typescript
   * const jwtService = new JwtService({ secretKey: 'your-secret-key' });
   * const token = await jwtService.generateToken({ userId: 123 });
   * // token will be a signed JWT string
   * ```
   */
  async generateToken<TPayload extends object>(payload: TPayload) {
    return jwt.sign(payload, this.config.secretKey);
  }

  /**
   * @description
   * Verifies a JWT token and returns the decoded payload.
   *
   * @param token The JWT token to verify
   * @returns The decoded payload if the token is valid
   *
   * @example
   * ```typescript
   * const jwtService = new JwtService({ secretKey: 'your-secret-key' });
   * const decoded = await jwtService.verifyToken(token);
   * // decoded will contain the payload if the token is valid
   * ```
   */
  async verifyToken(token: string) {
    return jwt.verify(token, this.config.secretKey);
  }
}

type Config = {
  secretKey: string;
};

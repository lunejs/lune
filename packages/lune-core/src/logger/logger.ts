import kleur from 'kleur';
const { white, gray, green, yellow, blue, red, magenta } = kleur;

/**
 * @description
 * Logger utility for Lune. Provides styled console logging for different levels
 * like `ready`, `info`, `warn`, and `error`.
 */
export class Logger {
  /**
   * @description
   * Logs an informational message. Use for general-purpose debugging or tracing.
   *
   * @param module - The context/module of the message.
   * @param message - The message to display.
   */
  static info(module: string, message: string) {
    if (!this.canLog()) return;

    console.log(this.common(), blue('i'), gray(`[${module}]`), white(message));
  }

  /**
   * @description
   * Logs a warning message, typically used for non-critical issues.
   *
   * @param module - The context/module of the warning.
   * @param message - The warning message.
   */
  static warn(module: string, message: string) {
    if (!this.canLog()) return;

    console.warn(this.common(), yellow('‼'), gray(`[${module}]`), yellow(message));
  }

  /**
   * @description
   * Logs an error message with optional metadata (e.g., error stack or object).
   *
   * @param module - The context/module where the error occurred.
   * @param message - A descriptive error message.
   * @param metadata - Optional metadata, typically an Error or object.
   */
  static error(module: string, message: string, metadata?: unknown) {
    if (!this.canLog()) return;

    console.error(this.common(), red('✖'), gray(`[${module}]`), red(message));

    if (metadata) {
      const formatted = this.formatMetadata(metadata);
      console.error(red('↪'), red(formatted));
    }
  }

  static graphql(message: string) {
    if (!this.canLog()) return;

    console.log(this.common(), magenta('◆'), gray(`[GraphqlRequest]`), magenta(message));
  }

  static ready(ctx: string, message: string) {
    if (!this.canLog()) return;

    console.log(this.common(), green('✔'), gray(`[${ctx}]`), white(message));
  }

  static banner(version: string) {
    if (!this.canLog()) return;

    console.log(white(`${this.common()} ⬢ Starting ${version}`));
  }

  static divider() {
    if (!this.canLog()) return;

    console.log(white(`${this.common()} ${'-'.repeat(60)}`));
  }

  private static common() {
    const timestamp = this.timestamp();
    const logo = this.logo();

    return `${gray(`[${timestamp}]`)} ${logo} ${gray('›')}`;
  }

  private static logo() {
    return gray('Lune');
  }

  private static timestamp() {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  private static formatMetadata(metadata: unknown): string {
    if (metadata instanceof Error) {
      return red(metadata.stack || metadata.message);
    }

    if (typeof metadata === 'object') {
      try {
        return red(JSON.stringify(metadata, null, 2));
      } catch {
        return red(String(metadata));
      }
    }

    return red(String(metadata));
  }

  private static canLog() {
    return process.env.NODE_ENV !== 'test';
  }
}

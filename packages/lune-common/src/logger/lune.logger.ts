import kleur from 'kleur';
const { gray, green, yellow, red } = kleur;

export type LuneLoggerLevel = '*' | 'info' | 'debug' | 'error' | 'fatal';

export class LuneLogger {
  private static levels: LuneLoggerLevel[] = [];

  static info(message: string) {
    if (!this.canLog('info')) return;

    console.log(`${green('info')}:`, message);
  }

  static query(operationName: string, result: string, ms: number) {
    if (!this.canLog('info')) return;

    console.log(
      `${green('info')}:`,
      gray(`${operationName}()`),
      result === 'OK' ? green(result) : red(result),
      gray(`${ms}ms`)
    );
  }

  static debug(message: string) {
    if (!this.canLog('debug')) return;

    console.log(`${yellow('debug')}:`, message);
  }

  static error(error: Error | unknown) {
    if (!this.canLog('error')) return;

    console.log(`${red('error')}:`, error);
  }

  static fatal(error: Error | unknown) {
    if (!this.canLog('fatal')) return;

    console.log(`${red('FATAL')}:`, error);
  }

  static ready(message: string) {
    if (!this.canLog('info')) return;

    console.log(green('✔'), message);
  }

  static setLevels(levels: LuneLoggerLevel[]) {
    this.levels = levels;
  }

  private static canLog(level: LuneLoggerLevel) {
    return this.levels.includes(level) || this.levels.includes('*');
  }
}

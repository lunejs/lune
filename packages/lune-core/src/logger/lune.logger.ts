import kleur from 'kleur';
const { green, yellow, blue, red } = kleur;

export type LuneLoggerLevel = '*' | 'info' | 'debug' | 'error';

export class LuneLogger {
  private static levels: LuneLoggerLevel[] = [];

  static info(message: string) {
    if (!this.canLog('info')) return;

    console.log(`${blue('info')}:`, message);
  }

  static debug(message: string) {
    if (!this.canLog('debug')) return;

    console.log(`${yellow('debug')}:`, message);
  }

  static error(error: Error) {
    if (!this.canLog('info')) return;

    console.log(`${red('error')}:`, error);
  }

  static fatal(error: Error) {
    if (!this.canLog('info')) return;

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

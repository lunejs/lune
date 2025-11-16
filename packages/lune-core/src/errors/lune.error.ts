export class LuneError extends Error {
  constructor(message: string) {
    super(message, {});

    this.name = 'LuneError';
  }
}

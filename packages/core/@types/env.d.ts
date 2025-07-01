export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local' | 'testing' | 'development' | 'production';
      DATABASE_URL: string;
    }
  }
}

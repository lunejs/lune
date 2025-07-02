export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local' | 'test' | 'development' | 'production';
      DATABASE_URL: string;
    }
  }
}

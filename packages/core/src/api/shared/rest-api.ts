import { NextFunction, Request, Response, Router } from "express";

export abstract class RestApi {
  router = Router();

  constructor(
    private readonly basepath: string,
    private readonly endpoints: RestApiEndpoint[],
    private readonly ctxMiddleware: RestApiHandler
  ) {
    this.setupRouter();
  }

  private setupRouter() {
    for (const endpoint of this.endpoints) {
      this.router[endpoint.method](`${this.basepath}${endpoint.path}`, this.ctxMiddleware,  ...endpoint.handlers);
    }
  }

}

export interface RestApiEndpoint {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handlers: RestApiHandler[];
}

export type RestApiHandler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;


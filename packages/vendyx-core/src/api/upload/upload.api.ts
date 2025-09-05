import { NextFunction, Request, Response } from 'express';

import { JwtService } from '@/libs/jwt';
import { Database } from '@/persistence/connection';

import { buildContext } from '../shared/context/build-context';
import { RestApi } from '../shared/rest-api';
import { UserJWT } from '../shared/types/api.types';

import { UploadEndpoints } from './upload.controller';

export class UploadApi extends RestApi {
  constructor(
    private readonly database: Database,
    private readonly jwtService: JwtService
  ) {
    super('/upload', UploadEndpoints, (...args) => this.contextMiddleware(...args));
  }

  private async contextMiddleware(req: Request, res: Response, next: NextFunction) {
    const shopId = req.headers['x_vendyx_shop_id']?.toString() ?? null;
    const jwt = req.headers['authorization']?.toString().replace('Bearer ', '');

    const userJwt = jwt ? await this.jwtService.verifyToken<UserJWT>(jwt) : null;

    const ctx = await buildContext(this.database, this.jwtService, shopId, userJwt);

    res.locals.context = ctx;

    next();
  }
}

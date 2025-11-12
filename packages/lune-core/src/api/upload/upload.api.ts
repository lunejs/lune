import type { NextFunction, Request, Response } from 'express';

import type { JwtService } from '@/libs/jwt';
import { LuneLogger } from '@/logger/lune.logger';
import type { Database } from '@/persistence/connection';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { RestApi } from '../shared/rest-api';
import type { UserJWT } from '../shared/types/api.types';

import { UploadEndpoints } from './upload.controller';

export class UploadApi extends RestApi {
  constructor(
    private readonly database: Database,
    private readonly jwtService: JwtService
  ) {
    super('/upload', UploadEndpoints, (...args) => this.contextMiddleware(...args));

    LuneLogger.info('UploadApi initialized');
  }

  private async contextMiddleware(req: Request, res: Response, next: NextFunction) {
    const shopId = req.headers[HeaderKeys.ShopId]?.toString() ?? null;
    const jwt = req.headers[HeaderKeys.Authorization]?.toString().replace('Bearer ', '');

    const userJWT = jwt ? await this.jwtService.verifyToken<UserJWT>(jwt) : null;

    // const ctx = await buildContext(this.database, this.jwtService, shopId, userJwt);
    const ctx = await buildContext({
      database: this.database,
      jwtService: this.jwtService,
      shopId,
      userJWT
    });

    res.locals.context = ctx;

    next();
  }
}

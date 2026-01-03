import type { NextFunction, Request, Response } from 'express';

import type { Database } from '@/persistence/connection/connection';
import { JwtService } from '@/security/jwt/jwt';

import { HeaderKeys } from '../shared/constants/headers.constants';
import { buildContext } from '../shared/context/build-context';
import { RestApi } from '../shared/rest-api';
import type { UserJWT } from '../shared/types/api.types';

import { UploadEndpoints } from './upload.controller';

export class UploadApi extends RestApi {
  constructor(private readonly database: Database) {
    super('/upload', UploadEndpoints, (...args) => this.contextMiddleware(...args));
  }

  private async contextMiddleware(req: Request, res: Response, next: NextFunction) {
    const timezone = req.headers[HeaderKeys.Timezone]?.toString() || 'UTC';
    const shopId = req.headers[HeaderKeys.ShopId]?.toString() ?? null;
    const jwt = req.headers[HeaderKeys.Authorization]?.toString().replace('Bearer ', '');

    const userJWT = jwt ? await JwtService.verify<UserJWT>(jwt) : null;

    const ctx = await buildContext({
      database: this.database,
      timezone,
      shopId,
      userJWT
    });

    res.locals.context = ctx;

    next();
  }
}

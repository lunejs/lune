import { LuneLogger } from '@lunejs/common';
import jwt from 'jsonwebtoken';

import { getConfig } from '@/config/config';

const generate = <TPayload extends object>(payload: TPayload) => {
  const { jwtExpiresIn, jwtSecret } = getConfig().auth;

  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn
  });
};

const verify = async <TPayload>(token: string): Promise<TPayload | null> => {
  const { jwtSecret } = getConfig().auth;

  try {
    return jwt.verify(token, jwtSecret) as TPayload;
  } catch (error) {
    LuneLogger.error(error);
    return null;
  }
};

export const JwtService = {
  generate,
  verify
};

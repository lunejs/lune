import type { NextFunction, Request, Response } from 'express';

import type { ExecutionContext } from '../context/types';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ctx = res.locals.context as ExecutionContext;

  if (!ctx.currentUser) {
    res.status(401).json({ message: 'Invalid access token' });
    return;
  }

  const user = await ctx.repositories.user.findById(ctx.currentUser.id);

  if (!user) {
    res.status(401).json({ message: 'Invalid access token' });
  }

  return next();
};

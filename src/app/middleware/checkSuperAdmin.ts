import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import config from '../../config';

export const superAdminVerify: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });

  try {
    const user: any = jwt.verify(token, config.jwt_token);
    (req as any).user = user;

    if (!user?.isSuperAdmin)
      res.status(401).send({
        status: 'Failed',
        message: 'Invalid token. User unauthorized.',
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });
  }

  next();
};

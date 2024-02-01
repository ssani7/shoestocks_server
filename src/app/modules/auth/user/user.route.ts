import express from 'express';

import { jwtVerify } from '../../../middleware/jwtMiddleware';

import { UserController } from './user.controller';

const router = express.Router();

router
  .get('/userInfo/:email', jwtVerify, UserController.getUserInfo)
  .post('/login', UserController.login)
  .post('/register', UserController.register);

export const UserRouter = router;

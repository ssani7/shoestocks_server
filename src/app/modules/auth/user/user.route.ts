import express from 'express';

import { UserController } from './user.controller';

const router = express.Router();

router
  .get('/userInfo/:email', UserController.getUserInfo)
  .get('/login', UserController.login)
  .post('/register', UserController.register);

export const UserRouter = router;

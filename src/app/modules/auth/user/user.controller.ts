import { RequestHandler } from 'express';

import { UserServices } from './user.service';

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('🚀 ~ constlogin:RequestHandler= ~ password:', password);
    const result = await UserServices.login({ email, password });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body;
    const result = await UserServices.register(userData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result = await UserServices.getUserInfo(email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  login,
  register,
  getUserInfo,
};

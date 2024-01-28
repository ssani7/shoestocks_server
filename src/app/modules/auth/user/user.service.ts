import { LoginData } from './user.interface';
import { User } from './user.model';

const login = async (userdata: LoginData) => {
  const user = await User.findOne({ email: userdata.email });

  if (!user) throw new Error('User not found for email: ' + userdata.email);

  if (user.password !== userdata.password) throw new Error('Invalid password');

  return user;
};

const register = async (userdata: LoginData) => {
  const existing = await User.findOne({ email: userdata.email });

  if (existing)
    throw new Error('User already exists for email: ' + userdata.email);

  const user = await User.create(userdata);

  return user;
};

const getUserInfo = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) throw new Error('User not found for email: ' + email);

  return user;
};

export const UserServices = {
  login,
  register,
  getUserInfo,
};

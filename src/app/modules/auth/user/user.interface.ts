export type IUser = {
  email: string;
  password: string;
  name?: string;
  profilePhoto?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

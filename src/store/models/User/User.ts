export type UserModel = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserApi = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type UserLoginModel = {
  email: string;
  password: string;
};

export type UserLoginApi = {
  error: string;
  user: string;
  access_token: string;
  refresh_token: string;
};

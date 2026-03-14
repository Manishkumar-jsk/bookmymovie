type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type GetUserResponse = {
  success: boolean;
  user: User;
};
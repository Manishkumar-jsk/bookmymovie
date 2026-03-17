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

export type AddUserPayload = {
  name:string;
  email:string;
  role:string;
}

export type UpdateUserPayload  = AddUserPayload & {id:string}

export type AddUserResponse = {
  success:boolean;
  message:string
}

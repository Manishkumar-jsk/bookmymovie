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

export type GetUsersResponse = {
  success: boolean;
  users: User[];
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

export interface userDetails {
  _id: string;
  name: string;
  email: string;
  role: string
}

export interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  details?:userDetails;
}

export interface EventsLocationResponse {
  success:boolean;
  locations:[];
}
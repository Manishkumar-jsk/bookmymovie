type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}
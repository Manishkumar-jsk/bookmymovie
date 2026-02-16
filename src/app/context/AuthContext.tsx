"use client";

import { createContext, useContext} from "react";
import { useGetUserQuery } from "../store/api/user";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetUserQuery(undefined);

  return (
    <AuthContext.Provider value={{ user: data?.user || null, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

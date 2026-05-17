"use client";

import { createContext, useContext } from "react";

// slices
import { useGetUserQuery } from "../store/api/authApi";

// types
import { AuthContextType } from "../types/authContextType";
import { DecodedToken } from "../types/user";

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: DecodedToken | null;
}) => {
  const { data, isLoading } = useGetUserQuery(undefined, {
    skip: !!initialUser,
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
  });

  const user = data?.user || initialUser;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

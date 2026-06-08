"use client";

import { createContext, useContext, useEffect } from "react";

import { getSocket } from "@/app/lib/socket";
import { useAuth } from "@/app/context/AuthContext";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();

  const socket = getSocket();

  useEffect(() => {
    console.log(user?._id,"user")
    if (!user?._id) return;

    socket.connect();

    console.log("Scoket")

    socket.emit("join", {
      userId:user._id,
      role:user.role
    });

    return () => {
      socket.disconnect();
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
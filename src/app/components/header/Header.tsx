"use client";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/app/context/AuthContext";
import UserProfileButton from "./components/user-profile-button/UserProfileButton";
import { useGetEventsLocationQuery } from "@/app/store/api/eventsApi";
import { useAppDispatch } from "@/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import { setLocation } from "@/app/store/slices/locationSlice";
import { useSocket } from "@/app/store/providers/SocketProvider";
import { useLazyGetNotificationsQuery } from "@/app/store/api/notificationsApi";
import Notification from "./components/notification/Notification";
import NotificationModal from "./components/notification/Notification";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: locationData } = useGetEventsLocationQuery();
  const [locations, setLocations] = useState(
    locationData?.locations.at(0) || "",
  );
  const [getNotifications,{data:notificationData}] = useLazyGetNotificationsQuery();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notificationData?.data?.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const handleNotifications = () => {
    setIsNotifOpen((prev) => !prev);
  }

  useEffect(() => {
    dispatch(setLocation({ location: locations }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations, locationData]);

  useEffect(() => {
    if(!socket) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("new-notification",(data:any) => {
      console.log(data);
      alert(data?.message);
    })

    return () => {
      socket.off("new-notification");
    }
  },[socket])

  useEffect(() => {
    getNotifications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <header className="flex items-center justify-between px-6 py-[14px] shadow-md">
      <h1
        className="text-2xl font-bold text-red-500 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <FontAwesomeIcon icon={faCompactDisc} /> EventBook
      </h1>

      <div className="flex items-center gap-2">
        {locationData && (
          <select
            className="rounded-md px-3 py-2 text-sm outline-none cursor-pointer"
            onChange={(e) => setLocations(e.target.value)}
          >
            {locationData?.locations?.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        )}
        {user && (
          <div className="relative" ref={notifRef}>
            <button
              className="relative p-2 cursor-pointer"
              onClick={handleNotifications}
              aria-label="Notifications"
            >
              <FontAwesomeIcon icon={faBell} className="text-lg" />
              {unreadCount && unreadCount > 0 ? (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-semibold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                {unreadCount}
              </span>
            ) : ''}
            </button>

            <NotificationModal
              isNotifOpen={isNotifOpen}
              notificationData={notificationData}
              unreadCount={Number(unreadCount)}
            />
          </div>
        )}
        {user ? (
          <UserProfileButton role={user?.role} />
        ) : (
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

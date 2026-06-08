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

const STATIC_NOTIFICATIONS = [
  {
    id: 1,
    title: "New event nearby!",
    message:
      "Rock Night 2025 is happening this Saturday in your city. Book now!",
    time: "2 mins ago",
    read: false,
    icon: "🎸",
  },
  {
    id: 2,
    title: "Booking confirmed",
    message:
      "Your ticket for Jazz Evening has been confirmed. Check your email.",
    time: "1 hour ago",
    read: false,
    icon: "🎟️",
  },
  {
    id: 3,
    title: "Event reminder",
    message: "Classical Music Night starts in 3 hours. Don't miss it!",
    time: "3 hours ago",
    read: false,
    icon: "⭐",
  },
  {
    id: 4,
    title: "Event cancelled",
    message:
      "Summer Fest has been cancelled. Refund will be processed in 3–5 days.",
    time: "Yesterday",
    read: true,
    icon: "📅",
  },
];
const Header = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: locationData } = useGetEventsLocationQuery();
  const [locations, setLocations] = useState(
    locationData?.locations.at(0) || "",
  );
  const [notifications, setNotifications] = useState(STATIC_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const dispatch = useAppDispatch();
  const socket = useSocket();


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

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
          <div className="relative" ref={notifRef}>
          <button
            className="relative p-2 cursor-pointer"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-semibold min-w-[16px] h-4 flex items-center justify-center rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-800">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 transition ${
                      !notif.read ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 ${
                        !notif.read ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      {notif.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 text-center">
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
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

import { useLazyGetNotificationsQuery, useReadNotificationMutation } from "@/app/store/api/notificationsApi";
import { Notification, NotificationResponse } from "@/app/types/notificationType";
import { formatDate } from "@/app/utils/date";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NotificationProps {
    isNotifOpen:boolean;
    unreadCount:number
    notificationData?:NotificationResponse,
}
const NotificationModal = ({isNotifOpen,notificationData,unreadCount}:NotificationProps) => {
  const [notifications, setNotifications] = useState<Notification[] | undefined>([]);
  const [readNotification] = useReadNotificationMutation();
  const [getNotifications] = useLazyGetNotificationsQuery();
  const router = useRouter();
  const markAllRead = () => {
    setNotifications((prev) => prev?.map((n) => ({ ...n, isRead: true })));
  };

  console.log(notifications,"notifications");
  console.log(notificationData,"notificationData");

  const handleReadNotification = (id:string,isRead:boolean) => {
    const notification = notificationData?.data?.filter((data) => data._id === id);
    if(!isRead && notification){
      readNotification({id,isRead:true})
      // getNotifications()
    }

    if(notification){
      router.push(`event/${notification[0]?.referenceId}`)
    }
  }

  useEffect(() => {
    if(notificationData?.data){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotifications(notificationData?.data)
    }
  },[notificationData]) 

  return (
    <>
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
            {notifications?.map((notif) => (
              <div
                key={notif._id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 transition ${
                  !notif.isRead ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => handleReadNotification(notif?._id,notif?.isRead)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">{formatDate(notif.createdAt)}</p>
                </div>
                {!notif.isRead && (
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
    </>
  );
};

export default NotificationModal;

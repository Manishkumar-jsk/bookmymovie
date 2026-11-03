export type Notification = {
    _id: string,
    user: string,
    isGlobal: boolean,
    title: string,
    message: string,
    type: string,
    referenceId: string,
    createdAt:string,
    isRead:boolean
}

export type NotificationResponse = {
    success: boolean,
    data: Notification[] 
}


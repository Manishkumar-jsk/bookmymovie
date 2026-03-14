export type Booking = {
    _id: string,
    user: string,
    event: {
        _id: string,
        title: string,
        image: string,
        date: string,
        location: string
    }
}

export type GetBookingResponse = {
    success: boolean,
    bookings: Booking[]
}
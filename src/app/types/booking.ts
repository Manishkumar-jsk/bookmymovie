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

export type CreateOrderResponse = {
    status: string;
    data: {
        orderId: string;
        amount: number;
        currency: string;
        bookingId: string;
        keyId: string;
    };
}

export type CreateOrderPayload = {
    eventId: string;
    quantity: number;
    ticketType: string;
}

export type VerifyOrderPayload = {
    bookingId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}

export type VerifyOrderResponse = {
    status: string;
    data: {
        _id: string;
        user: string;
        event: {
            _id: string;
            title: string;
            date: string;
            location: string;
        };
        bookingId: string;
        ticketType: string;
        quantity: number;
        totalAmount: number;
        paymentStatus: string;
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}
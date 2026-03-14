export type Event = {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: {
        _id: string,
        name: string
    };
    ticketTypes: {
        type: string,
        price: number,
        totalSeats: number,
        _id: string,
        availableSeats: number
    }[];
    createdBy: string;
    image: string;
    __v: number;
};

export type GetEventsResponse = {
    success: boolean;
    data: Event[];
};

export type GetEventsByIdResponse = {
    success: boolean;
    data: Event;
}
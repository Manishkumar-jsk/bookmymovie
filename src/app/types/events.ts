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


export interface TicketType {
    type: string;
    price: string;
    totalSeats: string;
}

export type EventPayload = {
    title: string;
    description: string;
    date: string;
    image: File | string;
    location: string;
    ticketTypes: TicketType[];
    category: string;
};

export interface EventDetails {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: {_id:string, name: string};
  image: string;
  ticketTypes: TicketType[];
}

export interface DeleteBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  details?:EventDetails;
}

export type UpdateEventPayload = EventPayload & { id: string };
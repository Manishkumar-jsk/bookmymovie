export type Revenue = {
    message: string,
    totalRevenue: number,
    revenue: {
        growth: number,
        type: string
    },
    ticketSoldGrowth:{
        growth:number,
        type:string
    },
    ticketEventGrowth:{
        growth:number,
        type:string
    },
    totalTicketSold: number,
    activeEvents: number
}

export interface EventCategory {
  _id: string;
  name: string;
  totalEvents: number;
}

export interface MetricsResponse {
  success: boolean;
  totalVipSalesByWeek: number;
  totalSilverSalesByWeek: number;
  totalGoldSalesByWeek: number;
  eventCategoriesCount: EventCategory[];
}


export interface EventAnalytics {
  _id: string;
  title: string;
  date: string;
  status: string;
  totalTickets: number;
  availableTickets: number;
  totalSoldTickets: number;
  totalRevenue: number;
}

export interface GetUpcomingEventsResponse {
  success: boolean;
  data: EventAnalytics[];
}
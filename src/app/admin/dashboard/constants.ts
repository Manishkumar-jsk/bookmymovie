//types
import { EventStatus } from "./types";

export const eventsColor = ['bg-indigo-500', 'bg-blue-400', 'bg-emerald-500', 'bg-yellow-400', 'bg-gray-300'];

export const statusClasses: Record<EventStatus, string> = {
    Live: "bg-emerald-100 text-emerald-700",
    Upcoming: "bg-yellow-100 text-yellow-700",
    "Sold Out": "bg-blue-100 text-blue-700",
    Completed: "bg-slate-100 text-slate-700",
    Draft: "bg-gray-100 text-gray-500",
};
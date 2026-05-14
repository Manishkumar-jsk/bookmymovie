"use client";

import { useRouter } from "next/navigation";

//slices
import {
  useGetMetricsDataQuery,
  useGetRevenueQuery,
  useGetUpcomingEventsDataQuery,
} from "@/app/store/api/adminDashboardApi";

//utils
import { formatDate } from "@/app/utils/date";
import { formatNumber } from "@/app/utils/numberFormatter";

//constants
import { eventsColor, statusClasses } from "./constants";

//types
import { EventStatus } from "./types";

export default function Dashboard() {
  const { data: revenuData } = useGetRevenueQuery();
  const { data: eventMetricsData } = useGetMetricsDataQuery();
  const { data: eventsData } = useGetUpcomingEventsDataQuery();
  const router = useRouter();

  const handleViewAll = () => {
    router.push("/admin/events");
  };

  const ticketSalesThisWeek = [
    {
      label: "VIP",
      pct: eventMetricsData?.totalVipSalesByWeek,
      color: "bg-indigo-500",
    },
    {
      label: "Gold",
      pct: eventMetricsData?.totalGoldSalesByWeek,
      color: "bg-emerald-500",
    },
    {
      label: "Silver",
      pct: eventMetricsData?.totalSilverSalesByWeek,
      color: "bg-yellow-400",
    },
  ];

  const kpiCards = [
    {
      label: "Total Revenue",
      value: formatNumber(Number(revenuData?.totalRevenue)),
      trend: `${revenuData?.revenue?.type === "increase" ? "↑" : "↓"} ${Number(revenuData?.revenue?.growth)}%`,
      trendUp: true,
      accent: "border-t-indigo-500",
    },
    {
      label: "Tickets Sold",
      value: formatNumber(Number(revenuData?.totalTicketSold)),
      trend: `${revenuData?.ticketSoldGrowth?.type === "increase" ? "↑" : "↓"} ${Number(revenuData?.ticketSoldGrowth?.growth)}%`,
      trendUp: true,
      accent: "border-t-emerald-500",
    },
    {
      label: "Active Events",
      value: formatNumber(Number(revenuData?.activeEvents)),
      trend: `${revenuData?.ticketEventGrowth?.type === "increase" ? "↑" : "↓"} ${Number(revenuData?.ticketEventGrowth?.growth)}%`,
      trendUp: true,
      accent: "border-t-yellow-500",
    },
  ];
  return (
    <div className="flex min-h-screen font-sans">
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="space-y-6">
          <section>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Key Metrics
            </p>
            <div className="grid grid-cols-4 gap-4">
              {kpiCards.map((card) => (
                <div
                  key={card.label}
                  className={`bg-white rounded-xl border border-gray-200 border-t-4 ${card.accent} p-5`}
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {card.value}
                  </p>
                  <p
                    className={`text-xs mt-2 font-medium ${card.trendUp ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {card.trend} vs last month
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">
                Ticket Sales This Week
              </p>
              <div className="space-y-3">
                {ticketSalesThisWeek?.map((t) => (
                  <div key={t.label}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{t.label}</span>
                      <span>{t.pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-2 rounded-full ${t.color}`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">
                Event Categories
              </p>
              <div className="space-y-2.5">
                {eventMetricsData?.eventCategoriesCount?.map((c, index) => (
                  <div
                    key={c._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-sm ${eventsColor[index]}`}
                      />
                      <span className="text-sm text-gray-600">{c.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {c.totalEvents}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">
                Upcoming Events
              </h2>
              <span
                className="text-xs text-indigo-600 cursor-pointer hover:underline"
                onClick={handleViewAll}
              >
                View All →
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["Event", "Date", "Status", "Tickets", "Revenue"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs text-gray-400 uppercase tracking-wide font-medium pb-3"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {eventsData?.data?.map((ev) => (
                  <tr
                    key={ev._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 font-semibold text-gray-800">
                      {ev.title}
                    </td>
                    <td className="py-3 text-gray-500 text-xs">
                      {formatDate(ev.date)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClasses[ev.status as EventStatus]}`}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600">
                      {ev.totalSoldTickets} / {ev.totalTickets}
                    </td>
                    <td className="py-3 font-semibold text-gray-800">
                      {formatNumber(ev.totalRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

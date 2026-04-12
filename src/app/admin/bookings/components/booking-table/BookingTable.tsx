"use client";

import React from "react";

//slices
import { useGetBookingsQuery } from "@/app/store/api/bookingApi";

//third-party
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

const BookingTable = () => {
  const { data: bookingData } = useGetBookingsQuery();
  const columnDefs = [
    { field: "_id", sortable: true },
    { field: "user", sortable: true },
    { field: "event.title", sortable: true },
    { field: "event.location", sortable: true },
  ];
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          rowData={bookingData?.bookings || []}
          columnDefs={columnDefs as ColDef[]}
          pagination={true}
          theme={"legacy"}
          autoSizeStrategy={{ type: "fitGridWidth" }}
        />
      </div>
    </div>
  );
};

export default BookingTable;

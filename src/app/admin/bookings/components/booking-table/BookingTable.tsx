'use client'
import { useGetBookingsQuery } from '@/app/store/api/bookingApi';
import { useGetCategoriesQuery } from '@/app/store/api/categoriesApi';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react'

const BookingTable = () => {
      const { data: bookingData } = useGetBookingsQuery();

    //   "bookings": [
    //     {
    //         "_id": "69b964944d5760535cc2b2a6",
    //         "user": "698a2468de6556aa98021467",
    //         "event": {
    //             "_id": "6999b5a9803b2e006b3ce885",
    //             "title": "Music by Arjit Singh",
    //             "image": "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
    //             "date": "2026-12-01T18:30:00.000Z",
    //             "location": "Hyderabad"
    //         }
    //     }
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
  )
}

export default BookingTable

"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import AddEditEventModal from "../add-edit-event-modal/AddEventModal";
import ActionsCell from "../action-cell/ActionCell";
import { useGetEventsQuery } from "@/app/store/api/eventsApi";

const EventsTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: eventsData } = useGetEventsQuery();
  const columnDefs = [
    { field: "_id", sortable: true },
    { field: "title", sortable: true },
    { field: "description", sortable: true },
    { field: "image", sortable: true },
    { field: "date", sortable: true },
    { field: "location", sortable: true },
    {
      headerName: "Ticket Types",
      field: "ticketTypes",
      sortable: false,
      flex: 2,
      width: 500,
      cellRenderer: (params: ICellRendererParams) => {
        const tickets = params.value || [];
        return (
          <div className="flex gap-2 flex-wrap items-center h-full">
            {tickets.map(
              (ticket: {
                availableSeats: number;
                price: number;
                totalSeats: number;
                type: string;
                _id: string;
              }) => (
                <span
                  key={ticket._id}
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                >
                  {ticket.type} — ₹{ticket.price}
                </span>
              ),
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: ActionsCell,
      sortable: false,
    },
  ];
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Events Management</h2>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </button>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          rowData={eventsData || []}
          columnDefs={columnDefs as ColDef[]}
          pagination={true}
          theme={"legacy"}
          autoSizeStrategy={{ type: "fitGridWidth" }}
        />
      </div>

      <AddEditEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default EventsTable;

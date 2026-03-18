"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import ActionsCell from "../action-cell/ActionCell";
import { useGetUsersQuery } from "@/app/store/api/user";
import AddUserModal from "../add-user-modal/AddUserModal";

const UserTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: userData } = useGetUsersQuery();
  const columnDefs = [
    { field: "_id", sortable: true },
    { field: "name", sortable: true },
    { field: "email", sortable: true },
    { field: "role", sortable: true },
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
        <h2 className="text-2xl font-semibold">Users Management</h2>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add User
          </button>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          rowData={userData?.users || []}
          columnDefs={columnDefs as ColDef[]}
          pagination={true}
          theme={"legacy"}
          autoSizeStrategy={{ type: "fitGridWidth" }}
        />
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default UserTable;

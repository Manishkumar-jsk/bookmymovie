"use client";

import React, { useEffect, useMemo, useState } from "react";

//third-party
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

//components
import ActionsCell from "../action-cell/ActionCell";
import AddCategoryModal from "../add-category-modal/AddCategoryModal";

//slices
import { useGetCategoriesQuery } from "@/app/store/api/categoriesApi";

const CategoryTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);
  const { data: categoryData } = useGetCategoriesQuery();

  const columnDefs = [
    { field: "_id", sortable: true },
    { field: "name", sortable: true },
    { field: "description", sortable: true },
    { field: "isActive", sortable: true },
    { field: "slug", sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: ActionsCell,
      sortable: false,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const filteredData = useMemo(() => {
    if (!debouncedSearch.trim()) return categoryData?.data;
    return categoryData?.data.filter(
      (category) =>
        category?.name
          ?.toLowerCase()
          .includes(debouncedSearch?.toLowerCase()) ||
        category?.description
          ?.toLowerCase()
          .includes(debouncedSearch?.toLowerCase()) ||
        category?.slug?.toLowerCase().includes(debouncedSearch?.toLowerCase()),
    );
  }, [debouncedSearch, categoryData]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Categorys Management</h2>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition cursor-pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Category
          </button>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={searchText}
          placeholder="search"
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded my-5 px-3 py-2 focus:outline-none focus:ring border-gray-300 w-[35%]"
        />
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          rowData={filteredData || []}
          columnDefs={columnDefs as ColDef[]}
          pagination={true}
          theme={"legacy"}
          autoSizeStrategy={{ type: "fitGridWidth" }}
        />
      </div>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CategoryTable;

"use client";

import { useState } from "react";

//third-party
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomCellRendererProps } from "ag-grid-react";

//components
import ModalPortal from "@/app/components/ModalPortal";
import DeleteCategoryModal from "../delete-category-modal/DeleteCategoryModal";
import AddCategoryModal from "../add-category-modal/AddCategoryModal";

function ActionsCell(props: CustomCellRendererProps) {
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="h-full flex items-center justify-center gap-2">
      <FontAwesomeIcon
        icon={faEdit}
        className="cursor-pointer pr-2"
        onClick={() => setEditIsModalOpen(true)}
      />
      <FontAwesomeIcon
        icon={faTrash}
        className="cursor-pointer"
        onClick={() => setIsDeleteModalOpen(true)}
      />
      <ModalPortal>
        <AddCategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setEditIsModalOpen(false)}
          details={props?.data}
        />
      </ModalPortal>
      <ModalPortal>
        <DeleteCategoryModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          details={props?.data}
        />
      </ModalPortal>
    </div>
  );
}

export default ActionsCell;

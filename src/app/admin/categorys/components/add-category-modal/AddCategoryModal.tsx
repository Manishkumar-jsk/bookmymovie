"use client";

import { useFormik } from "formik";
import { useMemo } from "react";
import { isNil } from "lodash";
import toast from "react-hot-toast";

//slices
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "@/app/store/api/categoriesApi";

//types
import { CategoryDetails } from "@/app/types/categories";

const INITIAL_FORM_VALUES = {
  name: "",
  description: "",
  isActive: false,
};

const AddCategoryModal = ({
  isOpen,
  onClose,
  details,
}: {
  isOpen: boolean;
  onClose: () => void;
  details?: CategoryDetails;
}) => {
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const isEdit = !isNil(details);

  const initialFormValues = useMemo(
    () =>
      !isNil(details)
        ? {
            name: details.name,
            description: details.description,
            isActive: details.isActive,
          }
        : INITIAL_FORM_VALUES,
    [details],
  );

  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { name, description, isActive } = values;

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        description,
        isActive,
      };

      if (isEdit) {
        await updateCategory({ id: details?._id, ...payload }).unwrap();
        toast.success("Category updated successfully");
      } else {
        await addCategory(payload).unwrap();
        toast.success("Category added successfully");
      }

      resetForm();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setFieldValue("description", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setFieldValue("isActive", e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isActive" className="font-medium cursor-pointer">
              isActive
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;

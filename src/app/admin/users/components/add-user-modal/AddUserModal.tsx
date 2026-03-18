"use client";

import { useFormik } from "formik";
import { useMemo } from "react";
import { isNil } from "lodash";
import toast from "react-hot-toast";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "@/app/store/api/user";
import { userDetails } from "@/app/types/user";

const INITIAL_FORM_VALUES = {
  name: "",
  email: "",
  role: "",
};

const AddUserModal = ({
  isOpen,
  onClose,
  details,
}: {
  isOpen: boolean;
  onClose: () => void;
  details?: userDetails;
}) => {
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const isEdit = !isNil(details);

  const initialFormValues = useMemo(
    () =>
      !isNil(details)
        ? {
            name: details.name,
            email: details.email,
            role: details.role,
          }
        : INITIAL_FORM_VALUES,
    [details],
  );

  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { name, email, role } = values;

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        email,
        role,
      };

      if (isEdit) {
        await updateUser({ id: details?._id, ...payload }).unwrap();
        toast.success("User updated successfully");
      } else {
        await addUser(payload).unwrap();
        toast.success("User added successfully");
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
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setFieldValue("role", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
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

export default AddUserModal;

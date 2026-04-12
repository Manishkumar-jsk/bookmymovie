"use client";

import { useFormik } from "formik";
import { useMemo } from "react";
import { isNil } from "lodash";

//slices
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "@/app/store/api/eventsApi";

//third-party
import toast from "react-hot-toast";

//types
import { EventDetails, TicketType } from "@/app/types/events";

const INITIAL_FORM_VALUES = {
  title: "",
  description: "",
  date: "",
  location: "",
  category: "",
  image: "" as File | string,
  ticketTypes: [{ type: "", price: "", totalSeats: "" }],
};

const AddEditEventModal = ({
  isOpen,
  onClose,
  details,
}: {
  isOpen: boolean;
  onClose: () => void;
  details?: EventDetails;
}) => {
  const [addEvent] = useAddEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const isEdit = !isNil(details);

  const initialFormValues = useMemo(
    () =>
      !isNil(details)
        ? {
            title: details.title,
            description: details.description,
            date: new Date(details.date).toISOString().slice(0, 10),
            location: details.location,
            category: details.category?.name,
            image: details.image,
            ticketTypes: details.ticketTypes?.length
              ? details.ticketTypes
              : [{ type: "", price: "", totalSeats: "" }],
          }
        : INITIAL_FORM_VALUES,
    [details],
  );

  const { values, setFieldValue, resetForm } = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { title, description, date, location, category, image, ticketTypes } =
    values;

  const addTicketType = () => {
    setFieldValue("ticketTypes", [
      ...ticketTypes,
      { type: "", price: "", totalSeats: "" },
    ]);
  };

  const removeTicketType = (index: number) => {
    const updated = ticketTypes.filter(
      (_: TicketType, i: number) => i !== index,
    );
    setFieldValue("ticketTypes", updated);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("ticketTypes", JSON.stringify(ticketTypes));

      if (isEdit) {
        formData.append("id", details?._id);
      }

      if (image instanceof File) {
        formData.append("image", image);
      }

      if (isEdit) {
        await updateEvent(formData).unwrap();
        toast.success("Event updated successfully");
      } else {
        await addEvent(formData).unwrap();
        toast.success("Event added successfully");
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
          {isEdit ? "Edit Event" : "Add Event"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setFieldValue("title", e.target.value)}
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

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setFieldValue("date", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setFieldValue("location", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setFieldValue("category", e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Image</label>
            {isEdit && typeof image === "string" && image && (
              <img
                src={image}
                alt="current"
                className="w-16 h-16 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) setFieldValue("image", file);
              }}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Ticket Types */}
        <div className="mt-5">
          <label className="block mb-2 font-medium">Ticket Types</label>

          {ticketTypes.map((ticket: TicketType, index: number) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              {/* Type */}
              <input
                type="text"
                placeholder="Type (VIP, Gold...)"
                value={ticket.type}
                onChange={(e) =>
                  setFieldValue(`ticketTypes[${index}].type`, e.target.value)
                }
                className="border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 w-1/3"
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price (₹)"
                value={ticket.price}
                onChange={(e) =>
                  setFieldValue(`ticketTypes[${index}].price`, e.target.value)
                }
                className="border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 w-1/3"
              />

              {/* Total Seats */}
              <input
                type="number"
                placeholder="Total Seats"
                value={ticket.totalSeats}
                onChange={(e) =>
                  setFieldValue(
                    `ticketTypes[${index}].totalSeats`,
                    e.target.value,
                  )
                }
                className="border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 w-1/3"
              />

              {/* Remove */}
              {ticketTypes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicketType(index)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add Row */}
          <button
            type="button"
            onClick={addTicketType}
            className="mt-1 text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            + Add Ticket Type
          </button>
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

export default AddEditEventModal;

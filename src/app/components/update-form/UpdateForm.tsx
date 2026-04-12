import React from "react";

const UpdateForm = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          defaultValue="Manish Kumar"
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue="manish@example.com"
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="tel"
          placeholder="Mobile"
          defaultValue="9876543210"
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="City"
          defaultValue="Indore"
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
        Update Profile
      </button>
    </div>
  );
};

export default UpdateForm;

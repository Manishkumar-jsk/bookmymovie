import React from "react";

//components
import UpdateForm from "../components/update-form/UpdateForm";

export default function ProfilePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <UpdateForm />
    </main>
  );
}

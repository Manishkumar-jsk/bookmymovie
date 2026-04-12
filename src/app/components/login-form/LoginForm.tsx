"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as Yup from "yup";

//slices
import { useLoginUserMutation } from "@/app/store/api/authApi";

//formik
import { useFormik } from "formik";

//third-party
import toast from "react-hot-toast";

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const searchParams = useSearchParams();
  const redirectTo = decodeURIComponent(searchParams.get("redirect") || "/");
  const router = useRouter();

  const {
    values,
    setFieldValue,
    handleSubmit,
    resetForm,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters required")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        await loginUser(values).unwrap();
        toast.success("Loggedin successfully");
        router.replace(redirectTo || "/");
        router.refresh();
        resetForm();
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={(e) => setFieldValue("email", e.target.value)}
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {touched.email && errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          name="password"
          onBlur={handleBlur}
          value={values.password}
          onChange={(e) => setFieldValue("password", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {touched.password && errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600 transition"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;

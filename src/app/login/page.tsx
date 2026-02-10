"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

//formik
import { useFormik } from "formik";

//slices
import { useLoginUserMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
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
        const data = await loginUser(values).unwrap();
        toast.success("Loggedin successfully");
        router.push("/");
        localStorage.setItem("token", data?.token);
        resetForm();
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

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

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}

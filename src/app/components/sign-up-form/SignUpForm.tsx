import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

//slices
import { useRegisterUserMutation } from "@/app/store/api/authApi";

const SignUpForm = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
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
      name: "",
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
      name: Yup.string().required("Name is required"),
    }),

    onSubmit: async (values) => {
      try {
        await registerUser(values).unwrap();
        toast.success("Account created successfully");
        router.push("/");
        resetForm();
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={(e) => setFieldValue("name", e.target.value)}
          placeholder="John Doe"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {touched.name && errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={(e) => setFieldValue("email", e.target.value)}
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
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;

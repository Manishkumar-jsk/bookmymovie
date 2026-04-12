import Link from "next/link";

//components
import SignUpForm from "../components/sign-up-form/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <SignUpForm />
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

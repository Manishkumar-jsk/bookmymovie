import Link from "next/link";

//components
import LoginForm from "../components/login-form/LoginForm";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <LoginForm />
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

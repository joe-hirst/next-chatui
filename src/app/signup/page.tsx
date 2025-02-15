"use client"; // Mark this as a Client Component

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Sign up the user using Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      console.log("Account creation successful:", data);

      // If sign-up is successful, show a success message and redirect
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login"); // Redirect to the login page
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.message || "An error occurred during sign-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSignUp}
        className="p-6 bg-gray-800 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          Create Account
        </h2>

        {/* Success Message */}
        {success && (
          <p className="mb-4 p-2 bg-green-500 text-white rounded">{success}</p>
        )}

        {/* Error Message */}
        {error && (
          <p className="mb-4 p-2 bg-red-500 text-white rounded">{error}</p>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mt-1 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 mt-1 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-emerald-500 text-gray-900 rounded hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Link to Login Page */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

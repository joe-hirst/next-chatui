"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful:", data);

      router.push("/");
    } catch (err) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-gray-800 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Login</h2>

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
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Link to Sign-Up Page */}
        <p className="mt-4 text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-emerald-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

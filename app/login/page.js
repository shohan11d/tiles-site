"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "../lib/auth-client";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    
    try {
      const { data: session, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/"
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      console.log("Logged in successfully:", session);
      toast.success("Login Successful!");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-neutral-950 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-neutral-900/50 p-8 backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Please enter your details to sign in to your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                className={`mt-1 block w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-white/10'} bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                  Password
                </label>
                <Link href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`block w-full rounded-xl border ${errors.password ? 'border-red-500' : 'border-white/10'} bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                  placeholder="••••••••"
                />
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide password" : "Show password"}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

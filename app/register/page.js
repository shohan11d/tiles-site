"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "../lib/auth-client";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Register Data:", data);
    
    try {
      const { data: session, error } = await authClient.signUp.email({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        image: data.photoUrl,
        callbackURL: "/"
      });

      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      if (session) {
        console.log("Registered successfully!");
        console.log(session);
        toast.success("Registration Successful!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-neutral-950 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/5 bg-neutral-900/50 p-8 backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Join us today and start exploring premium tile collections.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-300">
                First name
              </label>
              <input
                {...register("firstName", { required: "Required" })}
                type="text"
                className={`mt-1 block w-full rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-white/10'} bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                placeholder="Jane"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-300">
                Last name
              </label>
              <input
                {...register("lastName", { required: "Required" })}
                type="text"
                className={`mt-1 block w-full rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-white/10'} bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-neutral-300">
                Photo URL
              </label>
              <input
                {...register("photoUrl")}
                type="url"
                className="mt-1 block w-full rounded-xl border border-white/10 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
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
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "At least 8 characters"
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

          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                {...register("terms", { required: "You must agree to the terms" })}
                type="checkbox"
                className="h-4 w-4 rounded border-white/10 bg-neutral-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-neutral-900"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-neutral-400">
                I agree to the{" "}
                <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <p className="mt-1 text-[10px] text-red-500">{errors.terms.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

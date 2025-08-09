// pages/Login.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Layout: left big logo/title, right compact login box (like your screenshot)
 * Adjust Tailwind classes as needed to match spacing/typography.
 */

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        // redirect after login
        navigate("/");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-5xl w-full grid grid-cols-2 gap-8 p-10">
        {/* Left: Brand area */}
        <div className="flex flex-col justify-center p-8 border rounded-xl">
          <h1 className="text-4xl font-bold">Manthetic</h1>
          <p className="mt-4 text-gray-600">
            Stylish menswear. Manage your account and orders.
          </p>
        </div>

        {/* Right: Login box */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md border rounded-xl p-6 shadow-sm"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border px-3 py-2 rounded"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border px-3 py-2 rounded"
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <span>Forgot password?</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import hero1 from "../assets/images/summer_outfit.webp"
import { schema } from "@/lib/validation/loginSchema";



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
      <div className="max-w-5xl w-full grid grid-cols-2 gap-8 p-10 border border-gray-300 rounded-2xl">
        {/* Left: Brand area */}
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-6xl font-bold">Manthetic</h1>
          <p className="mt-4 text-gray-600">
            Stylish menswear. Manage your account and orders.
          </p>
          <img src={hero1} alt="mentetic product image" className="h-64 w-96 object-contain rounded-2xl m-4"/>
        </div>

        {/* Right: Login box */}
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md border border-gray-300 rounded-xl p-6 shadow-sm"
          >
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Forgot + Register */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <span>
                Not a user?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-black font-medium hover:underline"
                >
                  Register
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

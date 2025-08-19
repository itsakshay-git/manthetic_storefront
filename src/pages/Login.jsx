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
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-10 border border-gray-300 rounded-2xl">
        {/* Left: Brand area */}
        <div className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">Manthetic</h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 text-center max-w-xs sm:max-w-sm">
            Stylish menswear. Manage your account and orders.
          </p>
          <img
            src={hero1}
            alt="mentetic product image"
            className="h-48 w-72 sm:h-56 sm:w-80 lg:h-64 lg:w-96 object-contain rounded-2xl mt-4 sm:mt-6"
          />
        </div>

        {/* Right: Login box */}
        <div className="flex items-center justify-center order-1 lg:order-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md border border-gray-300 rounded-xl p-4 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 lg:hidden">
              Sign In
            </h2>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border border-gray-300 px-3 py-3 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
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
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 transition-colors font-medium text-base"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Forgot + Register */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <span>
                Not a user?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-black font-medium hover:underline transition-colors"
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

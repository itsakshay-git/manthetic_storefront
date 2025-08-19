import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import hero1 from "../assets/images/summer_outfit.webp"
import { schema } from "@/lib/validation/registerSchema";

const Register = () => {
  const { register: registerUser, registerMutation } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    registerUser(data, {
      onError: (err) => {
        toast.error(err?.message || "Failed to register");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col justify-center items-center order-2 lg:order-1">
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

        {/* Right Side - Register Form */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="bg-white border border-gray-300 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 lg:hidden">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-colors"
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 font-medium text-base mt-6"
              >
                {registerMutation.isPending ? "Signing up..." : "Sign Up"}
              </button>
            </form>

            {/* Already a user? */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already a user?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-black font-medium hover:underline transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

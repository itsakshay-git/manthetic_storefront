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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-10 flex gap-12">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold">Manthetic</h1>
          <p className="mt-4 text-gray-600 max-w-sm">
            Stylish menswear. Manage your account and orders.
          </p>
          <img src={hero1} alt="mentetic product image" className="h-64 w-96 object-contain rounded-2xl m-4"/>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1">
          <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
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
                className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition disabled:opacity-50"
              >
                {registerMutation.isPending ? "Signing up..." : "Sign Up"}
              </button>
            </form>
                        {/* Already a user? */}
            <p className="text-sm text-center text-gray-500 mt-5">
              Already a user?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-black font-medium hover:underline"
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

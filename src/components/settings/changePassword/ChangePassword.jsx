import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = ({ updatePassword }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (updatePassword.isSuccess) reset();
  }, [updatePassword.isSuccess, reset]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>

      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => updatePassword.mutate(data))}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            {...register("currentPassword", { required: "Current password is required" })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={updatePassword.isLoading}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {updatePassword.isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

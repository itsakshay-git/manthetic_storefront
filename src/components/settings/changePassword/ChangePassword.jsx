import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LockKeyhole } from "lucide-react";

const inputClass =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10";

const ChangePassword = ({ updatePassword }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (updatePassword.isSuccess) reset();
  }, [updatePassword.isSuccess, reset]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white">
          <LockKeyhole className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-gray-950">Change Password</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Use a strong password with at least six characters.
          </p>
        </div>
      </div>

      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit((data) => updatePassword.mutate(data))}
      >
        <div>
          <label className="text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            {...register("currentPassword", { required: "Current password is required" })}
            className={inputClass}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className={inputClass}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={updatePassword.isLoading}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {updatePassword.isLoading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

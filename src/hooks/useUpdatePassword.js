// hooks/useUpdatePassword.js
import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await axios.put("auth/update-password", payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.msg || "Password updated successfully");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data ||
        err.message ||
        "Password update failed";
      toast.error(message);
    },
  });
};

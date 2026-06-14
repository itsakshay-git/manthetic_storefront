// hooks/useUpdatePassword.js
import { useMutation } from "@tanstack/react-query";
import API from "../lib/axios";
import toast from "react-hot-toast";
import { displayErrorMessages } from "@/utils/errorHandler";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.put("auth/update-password", payload);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.msg || "Password updated successfully");
    },
    onError: (err) => {
      displayErrorMessages(err, "Password update failed", toast.error);
    },
  });
};

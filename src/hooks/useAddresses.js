import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";
import toast from "react-hot-toast";


export const useAddresses = (userId) => {
  return useQuery({
    queryKey: ["addresses", userId],
    queryFn: async () => {
      const res = await axios.get(`/addresses/${userId}`);
      return res.data;
    },
    enabled: !!userId
  });
};


export const useAddAddress = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/addresses`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries(["addresses", userId]);
    },
    onError: () => {
      toast.error("Failed to add address");
    }
  });
};


export const useDeleteAddress = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/addresses/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries(["addresses", userId]);
    },
    onError: () => {
      toast.error("Failed to delete address");
    }
  });
};

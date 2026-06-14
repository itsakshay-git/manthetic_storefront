import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../lib/axios";
import toast from "react-hot-toast";
import { queryKeys } from "@/lib/queryKeys";


export const useAddresses = (userId) => {
  return useQuery({
    queryKey: queryKeys.addresses(userId),
    queryFn: async () => {
      const res = await API.get(`/addresses/${userId}`);
      return res.data;
    },
    enabled: !!userId
  });
};


export const useAddAddress = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await API.post(`/addresses`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses(userId) });
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
      const res = await API.delete(`/addresses/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Address deleted successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses(userId) });
    },
    onError: () => {
      toast.error("Failed to delete address");
    }
  });
};

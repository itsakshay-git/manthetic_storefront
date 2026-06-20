import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import API from "@/lib/axios";
import { displayErrorMessages } from "@/utils/errorHandler";
import { queryKeys } from "@/lib/queryKeys";

export const usePlaceOrder = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ address_id, payment_method }) => {
      if (!address_id) throw new Error("Please select an address");

      const { data } = await API.post(
        "/order",
        { address_id, payment_method },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.cartRoot() });
    },
    onError: (error) => {
      displayErrorMessages(error, "Failed to place order", toast.error);
    },
  });
};

export const useCancelOrder = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      const { data } = await API.put(`/order/${orderId}/cancel`);
      return data;
    },
    onSuccess: () => {
      toast.success("Order cancelled successfully");
      queryClient.invalidateQueries({ queryKey: queryKeys.orders(userId) });
    },
    onError: (error) => {
      displayErrorMessages(error, "Failed to cancel order", toast.error);
    },
  });
};

export const useInfiniteOrders = (userId) => {
  return useInfiniteQuery({
    queryKey: queryKeys.orders(userId),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await API.get(`/order/user/${userId}?page=${pageParam}&limit=10`);
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    enabled: !!userId,
  });
};

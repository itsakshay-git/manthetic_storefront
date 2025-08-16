import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "@/lib/axios";

export const usePlaceOrder = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ address_id, payment_method }) => {
      if (!address_id) throw new Error("Please select an address");

      const { data } = await axios.post(
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
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries(["cart"]); // refresh cart data
      console.log("Order Response:", data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.msg || error.message || "Failed to place order";
      toast.error(message);
    },
  });
};


export const useInfiniteOrders = (userId) => {
  return useInfiniteQuery({
    queryKey: ['orders', userId],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(`/order/user/${userId}?page=${pageParam}&limit=10`);
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    enabled: !!userId,
  });
};

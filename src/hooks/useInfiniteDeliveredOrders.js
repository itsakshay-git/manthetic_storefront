import { useInfiniteQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";

export const useInfiniteDeliveredOrders = (userId) => {
  return useInfiniteQuery({
    queryKey: queryKeys.deliveredOrders(userId),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await API.get(
        `/order/user/delivered-orders/${userId}?page=${pageParam}&limit=10`
      );
      return data; // { orders, page, limit, totalOrders, hasMore }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    enabled: !!userId,
  });
};

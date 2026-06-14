import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";

const useTopSellingProducts = () => {
  return useQuery({
    queryKey: queryKeys.products({ is_best_selling: true }),
    queryFn: async () => {
      const res = await API.get("/products", {
        params: { is_best_selling: true },
      });
      return res.data;
    },
  });
};

export default useTopSellingProducts;

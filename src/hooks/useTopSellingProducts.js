import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

const useTopSellingProducts = () => {
  return useQuery({
    queryKey: ["products", { is_best_selling: true }],
    queryFn: async () => {
      const res = await axios.get("/products", {
        params: { is_best_selling: true },
      });
      return res.data;
    },
  });
};

export default useTopSellingProducts;

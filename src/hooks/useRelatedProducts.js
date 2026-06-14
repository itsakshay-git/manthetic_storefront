import { useQuery } from "@tanstack/react-query";
import API from "../lib/axios";
import { queryKeys } from "@/lib/queryKeys";

const fetchRelatedProducts = async (variantId) => {
  const { data } = await API.get(`/products/related/${variantId}`);
  return data.products;
};

export const useRelatedProducts = (variantId) => {
  return useQuery({
    queryKey: queryKeys.relatedProducts(variantId),
    queryFn: () => fetchRelatedProducts(variantId),
    enabled: !!variantId, // prevents running if no variantId
  });
};

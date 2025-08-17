import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

const fetchRelatedProducts = async (variantId) => {
  const { data } = await axios.get(`/products/related/${variantId}`);
  return data.products;
};

export const useRelatedProducts = (variantId) => {
  return useQuery({
    queryKey: ["relatedProducts", variantId],
    queryFn: () => fetchRelatedProducts(variantId),
    enabled: !!variantId, // prevents running if no variantId
  });
};

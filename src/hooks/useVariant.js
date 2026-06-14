import { useQuery } from "@tanstack/react-query";
import API from "../lib/axios";
import { queryKeys } from "@/lib/queryKeys";

const fetchVariantById = async (id) => {
  const { data } = await API.get(`/variants/variant/${id}`);
  return data;
};

export const useVariant = (id) => {
  return useQuery({
    queryKey: queryKeys.variant(id),
    queryFn: () => fetchVariantById(id),
    enabled: !!id,
  });
};

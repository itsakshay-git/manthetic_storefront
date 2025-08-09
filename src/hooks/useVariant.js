import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";

const fetchVariantById = async (id) => {
  const { data } = await axios.get(`/variants/variant/${id}`);
  return data;
};

export const useVariant = (id) => {
  return useQuery({
    queryKey: ["variant", id],
    queryFn: () => fetchVariantById(id),
    enabled: !!id,
  });
};

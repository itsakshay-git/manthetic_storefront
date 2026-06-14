import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => {
      const { data } = await API.get("/categories");
      return data;
    },
  });
};

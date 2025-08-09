import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await API.get("/categories");
      return data;
    },
  });
};

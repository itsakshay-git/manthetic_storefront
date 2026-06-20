import { useMutation } from "@tanstack/react-query";
import API from "@/lib/axios";

export default function useAiStyleFinder() {
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await API.post("/ai/storefront/style-finder", payload);
      return data;
    },
  });
}
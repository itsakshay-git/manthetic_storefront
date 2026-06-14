import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/lib/axios";
import { toast } from "react-hot-toast";
import { displayErrorMessages } from "@/utils/errorHandler";
import { queryKeys } from "@/lib/queryKeys";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_id, variant_id, rating, comment }) => {
      const { data } = await API.post('/reviews/add', { product_id, variant_id, rating, comment });
      return data;
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries({ queryKey: queryKeys.deliveredOrdersRoot() });
    },
    onError: (err) => {
      displayErrorMessages(err, "Failed to add review", toast.error);
    }
  });
};

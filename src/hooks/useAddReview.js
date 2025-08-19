import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { displayErrorMessages } from "@/utils/errorHandler";

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ product_id, variant_id, rating, comment }) => {
      const { data } = await axios.post('/reviews/add', { product_id, variant_id, rating, comment });
      return data;
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(['deliveredOrders']); // refresh delivered orders
    },
    onError: (err) => {
      displayErrorMessages(err, "Failed to add review", toast.error);
    }
  });
};

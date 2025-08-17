import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/lib/axios";
import toast from "react-hot-toast";

const useWishlist = (token, limit = 12) => {
  const queryClient = useQueryClient();

  // ✅ Fetch wishlist
  const wishlistQuery = useInfiniteQuery({
    queryKey: ["wishlist", token],
    queryFn: async ({ pageParam = 1 }) => {
      if (!token) throw new Error("No token provided");
      const res = await API.get(`/wishlist?page=${pageParam}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // { products, totalCount, page, totalPages }
    },
    getNextPageParam: (lastPage) => {
      // include last page
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    enabled: !!token,
  });

  // ✅ Add to wishlist
  const addToWishlist = useMutation({
    mutationFn: async ({ productId, variantId }) => {
      return API.post(
        "/wishlist",
        { product_id: productId, variant_id: variantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      toast.success("Added to wishlist");
      queryClient.invalidateQueries(["wishlist", token]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to add to wishlist");
    },
  });

  // ✅ Remove from wishlist
  const removeFromWishlist = useMutation({
    mutationFn: async ({ variantId }) => {
      return API.delete(`/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { variant_id: variantId }, // axios requires `data` for DELETE body
      });
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist", token]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to remove from wishlist");
    },
  });

  return {
    ...wishlistQuery,
    addToWishlist,
    removeFromWishlist,
  };
};

export default useWishlist;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { setCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import API from "../lib/axios";
import toast from "react-hot-toast";
import { displayErrorMessages } from "../utils/errorHandler";
import { queryKeys } from "@/lib/queryKeys";

export const fetchCart = async (token) => {
  try {
    const res = await API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error in fetchCart:", err);
    throw err;
  }
};

export default function useCart(token) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cartQueryKey = queryKeys.cart(token);

  const query = useQuery({
    queryKey: cartQueryKey,
    queryFn: async () => {
      const res = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCart(res.data));
      return res.data;
    },
    enabled: !!token,
  });

  const { data: cart = [], isLoading } = query;

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }) =>
      API.put(
        `/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey });

      const prevCart = queryClient.getQueryData(cartQueryKey) || [];
      const nextCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      queryClient.setQueryData(cartQueryKey, nextCart);
      dispatch(setCart(nextCart));
      return { prevCart };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prevCart) {
        queryClient.setQueryData(cartQueryKey, ctx.prevCart);
        dispatch(setCart(ctx.prevCart));
      }

      displayErrorMessages(err, "Failed to update quantity", toast.error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id) =>
      API.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey });
      const prevCart = queryClient.getQueryData(cartQueryKey) || [];
      const newCart = prevCart.filter((item) => item.id !== id);

      queryClient.setQueryData(cartQueryKey, newCart);
      dispatch(setCart(newCart));

      return { prevCart };
    },
    onError: (err, _vars, context) => {
      if (context?.prevCart) {
        queryClient.setQueryData(cartQueryKey, context.prevCart);
        dispatch(setCart(context.prevCart));
      }

      displayErrorMessages(err, "Failed to remove item", toast.error);
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ variant, token }) => {
      const defaultSize = variant.sizeOptions?.[0];
      if (!defaultSize) throw new Error("No size available for this product.");

      return API.post(
        "/cart",
        {
          variant_id: variant.id,
          quantity: 1,
          selected_size: defaultSize.size,
          selected_price: defaultSize.price || 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Added to cart successfully");
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
    onError: (err) => {
      displayErrorMessages(err, "Failed to add to cart", toast.error);
    },
  });

  return {
    cart,
    loading: isLoading,
    updateQuantity: (id, quantity) => updateQuantityMutation.mutate({ id, quantity }),
    removeItem: (id) => removeItemMutation.mutate(id),
    addToCart: (variant) => addToCartMutation.mutate({ variant, token }),
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { setCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import axios from "../lib/axios";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const fetchCart = async (token) => {
  try {
    const res = await axios.get("/cart", {
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


  const query = useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      const res = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCart(res.data));
      return res.data;
    },
    enabled: !!token,
    onSuccess: (data) => {
      console.log("✅ onSuccess fired with:", data);
    },
    onError: (err) => {
      console.error("❌ onError fired:", err);
    }
  });


  const { data: cart = [], isLoading } = query;


  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }) =>
      axios.put(
        `/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart", token] });

      const prevCart = queryClient.getQueryData(["cart", token]) || [];
      const nextCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      queryClient.setQueryData(["cart", token], nextCart);
      dispatch(setCart(nextCart));
      console.log("Updating cart item:", id, "to", quantity);
      return { prevCart };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevCart) {
        queryClient.setQueryData(["cart", token], ctx.prevCart);
        dispatch(setCart(ctx.prevCart));
      }
      toast.error("Failed to update quantity");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", token] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (id) => {
      console.log("🚀 removeItemMutation running for id:", id);
      return axios.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["cart", token]); // use same key with token
      const prevCart = queryClient.getQueryData(["cart", token]) || [];
      const newCart = prevCart.filter((item) => item.id !== id);

      queryClient.setQueryData(["cart", token], newCart);
      dispatch(setCart(newCart));

      return { prevCart };
    },
    onError: (err, _vars, context) => {
      console.error("❌ Remove error:", err.response?.data || err.message);
      queryClient.setQueryData(["cart", token], context.prevCart);
      dispatch(setCart(context.prevCart));
    },
    onSuccess: () => {
      console.log("✅ onSuccess fired");
      toast.success("Item removed from cart");
    },
    onSettled: () => {
      console.log("🔄 onSettled fired");
      queryClient.invalidateQueries(["cart", token]);
    }
  });


  const addToCartMutation = useMutation({
    mutationFn: async ({ variant, token }) => {
      console.log(variant)
      const defaultSize = variant.sizeOptions?.[0];
      if (!defaultSize) throw new Error("No size available for this product.");

      return axios.post(
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
      queryClient.invalidateQueries(["cart", token]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
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

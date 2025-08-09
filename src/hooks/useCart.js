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
        `http://localhost:5000/api/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries(["cart"]);
      const prevCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old) =>
        old.map((item) => item.id === id ? { ...item, quantity } : item)
      );
      return { prevCart };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["cart"], context.prevCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    }
  });

const removeItemMutation = useMutation({
  mutationFn: (id) => {
    console.log("🚀 removeItemMutation running for id:", id);
    return axios.delete(`http://localhost:5000/api/cart/${id}`, {
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

  return {
    cart,
    loading: isLoading,
    updateQuantity: (id, quantity) => updateQuantityMutation.mutate({ id, quantity }),
    removeItem: (id) => removeItemMutation.mutate(id)
  };
}

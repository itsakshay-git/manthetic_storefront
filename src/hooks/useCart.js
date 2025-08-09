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
  const hasSetCart = useRef(false);


  const query  = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(token),
    onSuccess: (data) => {
      try {
        dispatch(setCart(data));
      } catch (e) {
        console.error("Error inside onSuccess:", e);
      }
    },
      onError: (err) => {
      console.error("onError called:", err);
    }
  });


const { data: cart = [], isLoading } = query;

    useEffect(() => {
      if (query.isSuccess && !hasSetCart.current) {
        dispatch(setCart(query.data));
        hasSetCart.current = true;
      }
    }, [query.isSuccess, query.data, dispatch]);


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
    mutationFn: (id) =>
      axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["cart"]);
      const prevCart = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old) =>
        old.filter((item) => item.id !== id)
      );
      return { prevCart };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["cart"], context.prevCart);
    },
    onSuccess: () => {
      console.log("onSuccess fired");
      toast.success("Item removed from cart");
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries(["cart"]);
    }
  });

  return {
    cart,
    loading: isLoading,
    updateQuantity: (id, quantity) => updateQuantityMutation.mutate({ id, quantity }),
    removeItem: (id) => removeItemMutation.mutate(id)
  };
}

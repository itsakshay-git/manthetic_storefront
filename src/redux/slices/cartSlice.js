import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "@/lib/storageKeys";

const savedCart = JSON.parse(localStorage.getItem(storageKeys.cart)) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
    count: savedCart.reduce((sum, item) => sum + item.quantity, 0)
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem(storageKeys.cart, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      localStorage.removeItem(storageKeys.cart);
    }
  }
});


export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

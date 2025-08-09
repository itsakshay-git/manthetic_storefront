import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

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
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      localStorage.removeItem("cart");
    }
  }
});


export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

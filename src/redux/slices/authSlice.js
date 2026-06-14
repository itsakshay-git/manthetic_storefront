// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "@/lib/storageKeys";

const initialState = {
  token: localStorage.getItem(storageKeys.authToken) || null,
  user: JSON.parse(localStorage.getItem(storageKeys.user) || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      // persist
      localStorage.setItem(storageKeys.authToken, token);
      localStorage.setItem(storageKeys.user, JSON.stringify(user));
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem(storageKeys.authToken);
      localStorage.removeItem(storageKeys.user);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem(storageKeys.user, JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(storageKeys.authToken);
      localStorage.removeItem(storageKeys.user);
    },
  },
});

export const { setCredentials, clearCredentials, updateUser, logout  } = authSlice.actions;
export default authSlice.reducer;

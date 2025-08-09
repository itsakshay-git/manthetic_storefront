// hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post("/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const { token, user } = data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(setCredentials({ token, user }));
      localStorage.setItem("manthetic_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Login failed";
      toast.error(message);
    },
  });

  return {
    login: (credentials) => mutation.mutate(credentials),
    ...mutation,
  };
};

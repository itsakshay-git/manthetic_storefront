import { useMutation } from "@tanstack/react-query";
import API from "../lib/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const { token, user } = data;
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(setCredentials({ token, user }));
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

  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await API.post("/auth/register", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const { token, user } = data;
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(setCredentials({ token, user }));
      toast.success("Account created successfully");
      navigate("/login");
    },
    onError: (err) => {
      const message =
        err?.response?.data?.msg ||
        err?.response?.data ||
        err.message ||
        "Registration failed";
      toast.error(message);
    },
  });

  return {
    login: (credentials) => loginMutation.mutate(credentials),
    register: (credentials) => registerMutation.mutate(credentials),
    ...loginMutation,
    registerMutation,
  };
};

import { registerUser } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { api, setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    global: null,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const mutation = useMutation({
    mutationFn: ({ email, password }) => registerUser(api, { email, password }),
    onSuccess: (data) => {
      setToken(data.accessToken);
      navigate("/home");
    },
    onError: () => {
      setErrors((prev)=> ({email:null, password:true, global:null}) );
      }
    },
  );
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setErrors((prev) => ({ email: "Invalid email format" ,password:false, global:null}));
      return;
    }
    mutation.mutate({ email, password });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
  };
};

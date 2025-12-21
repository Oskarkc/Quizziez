import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useLogin = () => {
  const { api, setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("testowy@wp.pl");
  const [password, setPassword] = useState("Tojestmojesilnehaslo123-");
  const [errors, setErrors] = useState({ email: null, password: null, global: null });

  const mutation = useMutation(
    {
      mutationFn: ({ email, password }) => loginUser(api, { email, password }),
      onSuccess: (data) => {
        setToken(data.accessToken);       
        navigate("/home");
      },
      onError: (error) => {
        const newErrors = { email: null, password: null, global: null };
        if (error.response.data.includes("email")) {
          newErrors.email = error.response.data;
        }else if (error.response.data.includes("password")) {
          newErrors.password = error.response.data;
        } else {
          newErrors.global = error.response?.data || error.message;
        }
        setErrors(newErrors);
      },
    }
    
  );
  const handleSubmit = () => {
    mutation.mutate({ email, password });
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
  }
};

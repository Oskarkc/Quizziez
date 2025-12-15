import { registerUser } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider.jsx";

export const useRegister = () => {
  const { api, setToken } = useAuth();

  return useMutation(
    {
      mutationFn: ({ email, password }) => registerUser(api, { email, password }),
      onSuccess: (data) => {
        setToken(data.accessToken); 
      },
      onError: (error) => {
        console.error("Błąd logowania:", error.response?.data || error.message);
      },
    }
  );
};
 
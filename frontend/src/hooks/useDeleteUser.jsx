import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import { deleteUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const { api, setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteUser(api),
    onSuccess: () => {
      queryClient.clear();
      setToken(null);
      navigate("/");
    },
  });
  const handleDeleteUser = () => {
    mutation.mutate();
  };
  return { handleDeleteUser };
};

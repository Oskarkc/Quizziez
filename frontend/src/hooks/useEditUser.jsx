import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import { editUserEmail, editUserPassword } from "../api/auth.js";
import { useState } from "react";

export const useEditUser = () => {
  const { api } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    return regex.test(password);
};

  const emailmutation = useMutation({
    mutationFn: (newEmail) => editUserEmail(api, newEmail),
    onSuccess: () => {
      console.log("Email changed");
    },
  });
  const passwordmutation = useMutation({
    mutationFn: (newPassword) => editUserPassword(api, newPassword),
    onSuccess: () => {
      console.log("Password changed");
    },
  });
  const handleEditEmail = (newEmail) => {
    if (!validateEmail(newEmail)) {
      console.error("Invalid email format");
      return;
    }
    emailmutation.mutate(newEmail);
    setNewEmail("")
  };
  const handleEditPassword = (newPassword) => {
    if (!validatePassword(newPassword)) {
        console.error("Password does not meet criteria");
        return;
    }
    passwordmutation.mutate(newPassword);
    setNewPassword("")
  };
  return {
    handleEditEmail,
    handleEditPassword,
    newEmail,
    setNewEmail,
    newPassword,
    setNewPassword,
  };
};

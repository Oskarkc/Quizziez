import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

export default function LogoutButtonComponent() {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const handleLogout = () => {
        // Here you can add any logout logic like clearing tokens or user data
        setToken(null);
        navigate("/");
    }
    return(
        <ButtonComponent onClick={handleLogout}>Logout</ButtonComponent>
    );
}
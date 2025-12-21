import { createContext, useState, useContext, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);


export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setTokenState] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const api = axios.create({
    baseURL: "http://localhost:5141",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
 
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });


  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(
            "http://localhost:5141/auth/refresh",
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const newAccessToken = res.data.accessToken;
          setToken(newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Sesja wygasła, przekierowanie do logowania.");
          setToken(null);
          localStorage.removeItem("refreshToken");
          navigate("/");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  const setToken = (newToken) => {
    if (newToken) localStorage.setItem("accessToken", newToken);
    else localStorage.removeItem("accessToken");
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

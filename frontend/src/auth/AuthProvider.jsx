import { createContext, useState, useContext } from "react";
import axios from "axios";


const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
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
            const res = await axios.post("http://localhost:5141/auth/refresh", {} ,
              { withCredentials: true},
            );

            const newAccessToken = res.data.accessToken;
            setToken(newAccessToken);
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          } catch (err) {
            setToken(null);
            localStorage.removeItem("refreshToken");
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

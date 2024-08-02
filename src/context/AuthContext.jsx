import { createContext } from "react";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import api2 from "../api2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(null);
      setUser(null);
    });
  }, []);

  const refreshToken = async () => {
    const result = await api2.get("/api/manage_tokens/");

    const refreshToken = result.data.refresh;

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      console.log({ Res: res });
      if (res.status === 200) {
        //localStorage.setItem(ACCESS_TOKEN, res.data.access);
        await api2.post("/api/manage_tokens/", {
          token: res.data.access,
          refresh: refreshToken,
          user: result.data.user,
        });
        setIsAuthorized(true);
      } else setIsAuthorized(false);
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    //const token = localStorage.getItem(ACCESS_TOKEN);
    const result = await api2.get("/api/manage_tokens/");
    //console.log(result.data.token);
    const token = result.data.token;
    if (!token) {
      setIsAuthorized(null);
      setUser(null);
      return;
    }
    setUser(result.data.user);
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthorized, setUser, setIsAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};

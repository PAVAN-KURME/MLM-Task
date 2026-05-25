import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("mlm_token");
  const storedUser = localStorage.getItem("mlm_user");

  const [token, setToken] = useState(storedToken || "");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const loginUser = ({ token: authToken, user: authUser }) => {
    localStorage.setItem("mlm_token", authToken);
    localStorage.setItem("mlm_user", JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem("mlm_token");
    localStorage.removeItem("mlm_user");
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loginUser,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

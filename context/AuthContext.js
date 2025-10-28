"use client";
import { createContext, useEffect, useState } from "react";
import { getMe } from "@/actions/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMe();
      setAuthenticated(res.authentication);
      setUser(res.user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

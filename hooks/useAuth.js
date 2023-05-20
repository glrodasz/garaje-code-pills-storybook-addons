import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async () => {
    const user = await fetch("/auth/user").then((data) => data.json());
    setUser(user);
  };

  const logout = async () => await setUser(null);

  return { user, login, logout };
};

export default useAuth;

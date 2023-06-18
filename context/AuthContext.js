import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn, []);

  //Register user
  const register = async (user) => {
    console.log("Authcontext::register called with user object");
    console.log(user);

    const body = JSON.stringify({user})
    console.log(body);
    
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      console.log(`Authcontext::register Got this message api/register: ${data.message}`);
      setError(data.message);
    }
  };

  //Login user
  const login = async ({ email: identifier, password }) => {
    console.log("Autcontext::login-called with identifier and password");
    console.log(`AuthContext::loging ${identifier}, ${password}`);

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      console.log(`AuthContext::login - Got this message from api/login: ${data.message}`);
      setError(data.message);
    }
  };

  //Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  //Check if user is logged in
  const checkUserLoggedIn = async (user) => {

    console.log("Authcontext::CheckUserLoggedIn-called with user object:");
    console.log(user);

    const res = await fetch(`${NEXT_URL}/api/user`);

    if (res.ok) {
      const user = await res.json();
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

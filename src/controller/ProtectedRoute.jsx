import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { CheckToken } from "./userController";
import Loading1 from "../componentes/Loader/Loading1";

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const mobile = Cookies.get("mobile");
      const token = Cookies.get("token");

      if (!token || !mobile) {
        // Redirect to login page without a full page reload
        return (window.location.href = "/login");
      }

      try {
        const response = await CheckToken();
        if (response.status !== true) {
          // Redirect to login page without a full page reload
          return (window.location.href = "/login");
        }
        setIsAuthenticated(true);
      } catch (error) {
        // Redirect to login page on error without a full page reload
        return (window.location.href = "/login");
      }
    };

    checkToken();
  }, []);

  if (!isAuthenticated) {
    return <Loading1 />;
  }

  return children;
};

export const CheckIsUserLogin = async () => {
  const mobile = Cookies.get("mobile");
  const token = Cookies.get("token");

  if (!mobile || !token) {
    return { loggedIn: false, message: "Not Logged In" };
  } else {
    try {
      const response = await CheckToken();
      if (response.status === true) {
        return { loggedIn: true, message: "Logged In" };
      } else {
        return { loggedIn: false, message: "Not Logged In" };
      }
    } catch (error) {
      return { loggedIn: false, message: "Not Logged In" };
    }
  }
};

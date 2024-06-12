// src/components/LogoutButton.tsx
import React from "react";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../graphql/usersQueries";
import { useAuth } from "./AuthWrapper";
import Cookies from "js-cookie";

const LogoutButton: React.FC = () => {
  const { token, setToken } = useAuth();
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      // Call the logoutUser mutation with the current token
      await logoutUser({ variables: { token } });
      Cookies.remove("token");
      console.log("Logged out successfully!");
      // Clear the token from the AuthContext
      setToken(undefined);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return token ? <button onClick={handleLogout}>Logout</button> : null;
};

export default LogoutButton;

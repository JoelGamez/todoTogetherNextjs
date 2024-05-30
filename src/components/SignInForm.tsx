import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "./AuthWrapper"; // Import the useAuth hook
import { AUTHENTICATE_USER } from "../graphql/usersQueries";
import Cookies from "js-cookie";

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const { setToken } = useAuth(); // Use the useAuth hook to get the setToken function

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data } = await authenticateUser({
      variables: { username, password },
    });
    if (data && data.authenticateUser) {
      setToken(data.authenticateUser.token); // Call setToken with the received token
      Cookies.set("token", data.authenticateUser.token); // Save the token to the cookies
    }
  };

  return (
    <>
      <h1>RUH OH, YOUR NOT SIGNED IN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign In" />
      </form>
    </>
  );
};

export default SignInForm;

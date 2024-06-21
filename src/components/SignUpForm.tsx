import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Cookies from "js-cookie"; // Ensure Cookies is imported if you're using it
import { ADD_USERS } from "../graphql/usersQueries";

interface SignupFormProps {
  onSignupSuccess: () => void;
  onBackToSignIn: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSignupSuccess,
  onBackToSignIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addUser] = useMutation(ADD_USERS);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Existing validation and mutation code remains unchanged
    try {
      const { data } = await addUser({
        variables: { email, password, username },
      });
      console.log(data);
      if (data && data.addUser) {
        const token = data.addUser.token;
        Cookies.set("token", token); // Save the token to the cookies
        // Call the callback function to switch back to the SignInForm
        onSignupSuccess();
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
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
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
      <button onClick={onBackToSignIn}>Back to Sign In</button>
    </>
  );
};

export default SignupForm;

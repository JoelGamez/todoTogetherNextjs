import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "./AuthWrapper"; // Import the useAuth hook
import { AUTHENTICATE_USER } from "../graphql/usersQueries";
import SignupForm from "./SignUpForm";
import PasswordResetRequestForm from "./PasswordResetRequestForm"; // Import the PasswordResetRequestForm
import Cookies from "js-cookie";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const { setToken } = useAuth(); // Use the useAuth hook to get the setToken function

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data } = await authenticateUser({
      variables: { email, password },
    });

    if (data && data.authenticateUser) {
      setToken(data.authenticateUser.token); // Call setToken with the received token
      Cookies.set("token", data.authenticateUser.token); // Save the token to the cookies
    }
  };

  if (showSignup) {
    return (
      <SignupForm
        onSignupSuccess={() => setShowSignup(false)}
        onBackToSignIn={() => setShowSignup(false)} // Ensure this prop is passed correctly
      />
    );
  }

  if (showPasswordReset) {
    return (
      <PasswordResetRequestForm
        onBackToSignIn={() => setShowPasswordReset(false)}
      />
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Sign In" />
      </form>
      <button onClick={() => setShowSignup(true)}>Sign Up</button>
      <br />
      <button onClick={() => setShowPasswordReset(true)}>
        --Forgot Password?--
      </button>
    </>
  );
};

export default SignInForm;

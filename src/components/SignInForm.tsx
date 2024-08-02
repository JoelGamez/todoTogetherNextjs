import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "./AuthWrapper"; // Import the useAuth hook
import { AUTHENTICATE_USER } from "../graphql/usersQueries";
import SignupForm from "./SignUpForm";
import Logo from "./Logo";
import PasswordResetRequestForm from "./PasswordResetRequestForm"; // Import the PasswordResetRequestForm
import Cookies from "js-cookie";
import { Box } from "@mui/material";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        style={{
          width: "100%",
          maxWidth: "400px", // Limit the width for mobile view
          textAlign: "center", // Center the text inside this Box
        }}
      >
        <Logo />
        <h1>HoneyDoo</h1>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Email: */}
          <input
            id="email"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "44px",
              padding: "8px",
              width: "100%",
              border: "none",
              color: "black",
              marginBottom: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
          {/* </label> */}
          {/* <label>
            Password: */}
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderRadius: "44px",
              padding: "8px",
              width: "100%",
              border: "none",
              color: "black",
              marginBottom: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
          {/* </label> */}
          <input
            id="siginIn"
            type="submit"
            value="Sign In"
            style={{
              borderRadius: "44px",
              padding: "8px",
              width: "100%",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              border: "none",
              color: "black",
              marginBottom: "16px",
              backgroundColor: "#d69f0b",
            }}
          />
        </form>
        <button
          onClick={() => setShowSignup(true)}
          style={{
            borderRadius: "44px",
            padding: "8px",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            border: "none",
            color: "black",
            marginBottom: "16px",
            backgroundColor: "#d69f0b",
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowPasswordReset(true)}
          style={{
            borderRadius: "44px",
            padding: "8px",
            border: "none",
            color: "black",
            marginBottom: "16px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          Forgot Password?
        </button>
      </Box>
    </Box>
  );
};

export default SignInForm;

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "../graphql/usersQueries";

interface SignupFormProps {
  onBackToSignIn: () => void;
}

const PasswordResetRequestForm: React.FC<SignupFormProps> = ({
  onBackToSignIn,
}) => {
  const [email, setEmail] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [requestPasswordReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await requestPasswordReset({
        variables: { email },
      });
      if (data.requestPasswordReset) {
        alert("Password reset link sent. Check your email.");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      alert("Failed to send password reset link.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Request Password Reset</h1>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <input type="submit" value="Send Reset Link" />
      </form>
      <button type="button" onClick={onBackToSignIn}>
        Back to Sign In
      </button>
    </>
  );
};

export default PasswordResetRequestForm;

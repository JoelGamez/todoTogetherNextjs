// pages/reset-password/[token].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../src/graphql/usersQueries"; // Adjust the import path as necessary

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setNewPassword] = useState("");
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await resetPassword({ variables: { token, password } });
      alert(
        "Password reset successfully. You can now log in with your new password."
      );
      router.push("/"); // Redirect to login page or show a success message
    } catch (error) {
      alert("Failed to reset password. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;

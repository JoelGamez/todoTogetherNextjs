import React from "react";

interface UserStatusProps {
  username: string | null;
}

const UserStatus: React.FC<UserStatusProps> = ({ username }) => {
  return <div>{username ? `Signed in as ${username}` : "Not signed in"}</div>;
};

export default UserStatus;

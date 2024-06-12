// src/app/page.tsx
"use client";

import TaskList from "./TaskList";
import React from "react";
import AuthWrapper from "./AuthWrapper"; // Import the AuthWrapper
import LogoutButton from "./LogoutButton";

const Home: React.FC = () => {
  return (
    <>
      <AuthWrapper>
        <h1>test</h1>
        <TaskList />
        <LogoutButton />
      </AuthWrapper>
    </>
  );
};

export default Home;

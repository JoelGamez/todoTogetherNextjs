// src/app/page.tsx
"use client";

import TaskList from "./TaskList";
import React from "react";
import AuthWrapper from "./AuthWrapper"; // Import the AuthWrapper

const Home: React.FC = () => {
  return (
    <>
      <AuthWrapper>
        <h1>test</h1>
        <TaskList />
      </AuthWrapper>
    </>
  );
};

export default Home;

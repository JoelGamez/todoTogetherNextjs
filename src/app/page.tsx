// src/app/page.tsx
"use client";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import Home from "../components/Home";
import { ReactNode } from "react";

const TaskList = dynamic(() => import("../components/TaskList"), {
  ssr: false,
});

const Page: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      {/* <NoSsrThemeProvider> */}
      {/* <h1>HoneyDoo</h1> */}
      <Home />
      {/* </NoSsrThemeProvider> */}
    </>
  );
};

export default Page;

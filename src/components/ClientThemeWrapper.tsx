"use client";
import React, { useState, useEffect } from "react";
import { GlobalStyles } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme"; // Adjust the import path according to your project structure

const ClientThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs after the component mounts, setting isClient to true
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <GlobalStyles
          styles={{
            h1: {
              fontFamily: theme.typography.fontFamily,
            },
            body: {
              backgroundColor: theme.palette.background.default,
            },
            // Add more global styles as needed
          }}
        />
      )}
      {children}
    </>
  );
};

export default ClientThemeWrapper;
